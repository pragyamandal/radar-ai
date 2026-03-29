# Routes for Radar AI endpoints

import logging
import pandas as pd
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from app.pipelines.radar_pipeline import run_radar_pipeline
from app.services.explanation_service import generate_explanation
from app.agents.radar_agent import run_agent_pipeline
from app.services.voice_service import text_to_speech
from app.services.data_service import get_stock_data
import os

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/radar", tags=["radar"])


# Request models
class BacktestData(BaseModel):
    median_return: float
    best_return: float
    worst_return: float
    win_rate: float
    total_trades: int = None


class ExplainRequest(BaseModel):
    ticker: str
    signals: list
    signal_story: str
    risk_level: str
    backtest: BacktestData


class VoiceRequest(BaseModel):
    text: str
    ticker: str


class UserProfile(BaseModel):
    risk_profile: str  # conservative, moderate, aggressive
    holdings: List[str]  # list of tickers user already holds
    investment_horizon: str  # short, medium, long


@router.get("/health")
def health_check():
    """
    Health check endpoint for the Radar service.
    
    Returns:
        Status and service information
    """
    logger.info("Health check request received")
    return {"status": "ok", "service": "radar"}


@router.get("")
def get_radar_analysis():
    """
    Get radar analysis with trading opportunities.
    
    Returns:
        Dictionary with opportunities, do_nothing flag, and message
    """
    try:
        logger.info("Radar analysis request received")
        result = run_radar_pipeline()
        logger.info(f"Radar analysis completed: {len(result['opportunities'])} opportunities found")
        return result
    
    except Exception as e:
        logger.error(f"Error in radar analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Radar analysis failed: {str(e)}")


@router.post("/explain")
def explain_opportunity(request: ExplainRequest):
    """
    Generate AI explanation for a stock opportunity.
    
    Args:
        request: ExplainRequest with opportunity details
    
    Returns:
        Dictionary with explanation and ticker
    """
    try:
        logger.info(f"Explanation request received for {request.ticker}")
        
        # Convert request to opportunity dictionary
        opportunity = {
            "ticker": request.ticker,
            "signals": request.signals,
            "signal_story": request.signal_story,
            "risk_level": request.risk_level,
            "backtest": request.backtest.dict()
        }
        
        result = generate_explanation(opportunity)
        
        if result is None:
            logger.error(f"Failed to generate explanation for {request.ticker}")
            raise HTTPException(status_code=500, detail=f"Failed to generate explanation for {request.ticker}")
        
        logger.info(f"Explanation generated for {request.ticker}")
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating explanation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Explanation generation failed: {str(e)}")


@router.get("/agent")
def get_radar_agent_analysis():
    """
    Get radar analysis using LangGraph agent pipeline.
    
    Returns:
        Dictionary with opportunities, do_nothing flag, and message
    """
    try:
        logger.info("Radar agent analysis request received")
        result = run_agent_pipeline()
        logger.info(f"Radar agent analysis completed: {len(result['opportunities'])} opportunities found")
        return result
    
    except Exception as e:
        logger.error(f"Error in radar agent analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Radar agent analysis failed: {str(e)}")


@router.post("/voice")
def generate_voice_explanation(request: VoiceRequest):
    """
    Generate audio from explanation text using Edge TTS.
    
    Args:
        request: VoiceRequest with text and ticker
    
    Returns:
        Audio file as MP3
    """
    try:
        logger.info(f"Voice request received for {request.ticker}")
        
        # Generate audio
        file_path = text_to_speech(request.text, request.ticker)
        
        if file_path is None:
            logger.error(f"Failed to generate audio for {request.ticker}")
            raise HTTPException(status_code=500, detail=f"Failed to generate audio for {request.ticker}")
        
        logger.info(f"Audio generated successfully for {request.ticker}: {file_path}")
        
        # Return audio file
        return FileResponse(
            path=file_path,
            media_type="audio/mpeg",
            filename=f"{request.ticker}_explanation.mp3"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating voice explanation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Voice generation failed: {str(e)}")


@router.post("/personalized")
def get_personalized_opportunities(request: UserProfile):
    """
    Get radar opportunities personalized to user profile.
    
    Args:
        request: UserProfile with risk profile, holdings, and investment horizon
    
    Returns:
        Filtered opportunities matching user profile
    """
    try:
        logger.info(f"Personalized request received for {request.risk_profile} investor")
        
        # Get all opportunities from agent pipeline
        result = run_agent_pipeline()
        all_opportunities = result['opportunities']
        
        # Filter based on risk profile
        risk_filtered = []
        for opp in all_opportunities:
            opp_risk = opp.get('risk_level', 'Moderate')
            
            if request.risk_profile.lower() == 'conservative':
                if opp_risk == 'Conservative':
                    risk_filtered.append(opp)
            elif request.risk_profile.lower() == 'moderate':
                if opp_risk in ['Conservative', 'Moderate']:
                    risk_filtered.append(opp)
            elif request.risk_profile.lower() == 'aggressive':
                risk_filtered.append(opp)
        
        logger.info(f"Risk filter: {len(all_opportunities)} -> {len(risk_filtered)} opportunities")
        
        # Remove stocks user already holds
        holdings_upper = [h.upper() for h in request.holdings]
        personalized_opps = []
        
        for opp in risk_filtered:
            ticker = opp['ticker']
            
            if ticker.upper() in holdings_upper:
                # Already holds this stock
                opp['portfolio_fit'] = {
                    'fits': False,
                    'reason': f"You already hold {ticker} in your portfolio"
                }
            else:
                # New opportunity
                opp['portfolio_fit'] = {
                    'fits': True,
                    'reason': f"{ticker} matches your {request.risk_profile} risk profile and {request.investment_horizon} investment horizon"
                }
                personalized_opps.append(opp)
        
        logger.info(f"Holdings filter: {len(risk_filtered)} -> {len(personalized_opps)} new opportunities")
        
        # Return filtered opportunities
        if not personalized_opps:
            return {
                "opportunities": [],
                "do_nothing": True,
                "message": f"No new opportunities found matching your {request.risk_profile} profile"
            }
        
        return {
            "opportunities": personalized_opps,
            "do_nothing": False,
            "message": f"Found {len(personalized_opps)} opportunities for your profile"
        }
    
    except Exception as e:
        logger.error(f"Error in personalized recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Personalized recommendations failed: {str(e)}")


@router.get("/price/{ticker}")
def get_price(ticker: str):
    try:
        df = get_stock_data(ticker)
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail="Stock not found")
        
        close = df['Close'].squeeze()
        if isinstance(close, pd.DataFrame):
            close = close.iloc[:, 0]
        close = pd.Series(close.values, dtype=float).dropna()
        
        current_price = round(float(close.iloc[-1]), 2)
        prev_price = round(float(close.iloc[-2]), 2)
        change_pct = round(((current_price - prev_price) / prev_price) * 100, 2)
        
        return {"ticker": ticker, "price": current_price, "change_pct": change_pct}
    except Exception as e:
        logging.error(f"Price error for {ticker}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/technicals/{ticker}")
def get_technicals(ticker: str):
    try:
        df = get_stock_data(ticker)
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail="Stock not found")
        
        close = df['Close'].squeeze()
        if isinstance(close, pd.DataFrame):
            close = close.iloc[:, 0]
        close = pd.Series(close.values, dtype=float).dropna()
        
        volume = df['Volume'].squeeze()
        if isinstance(volume, pd.DataFrame):
            volume = volume.iloc[:, 0]
        volume = pd.Series(volume.values, dtype=float).dropna()
        
        current_price = round(float(close.iloc[-1]), 2)
        week_52_high = round(float(close.max()), 2)
        week_52_low = round(float(close.min()), 2)
        avg_volume = float(volume.mean())
        current_volume = float(volume.iloc[-1])
        volume_ratio = round(current_volume / avg_volume, 2)
        
        delta = close.diff()
        gain = delta.where(delta > 0, 0).rolling(14).mean()
        loss = -delta.where(delta < 0, 0).rolling(14).mean()
        rs = gain / loss
        rsi = float(round(100 - (100 / (1 + rs.iloc[-1])), 1))
        
        position_pct = round((current_price - week_52_low) / (week_52_high - week_52_low) * 100, 1)
        is_breakout = current_price >= week_52_high * 0.98
        
        return {
            "ticker": ticker,
            "current_price": current_price,
            "week_52_high": week_52_high,
            "week_52_low": week_52_low,
            "volume_ratio": volume_ratio,
            "rsi": rsi,
            "position_pct": position_pct,
            "is_breakout": is_breakout,
            "breakout_text": f"Price at {position_pct}% of 52-week range. RSI at {rsi} — {'momentum building' if rsi < 70 else 'overbought territory'}. Volume {volume_ratio}x average {'confirming' if volume_ratio > 1.2 else 'below'} the move."
        }
    except Exception as e:
        logging.error(f"Technicals error for {ticker}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{ticker}")
def get_history(ticker: str):
    try:
        df = get_stock_data(ticker)
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail="Stock not found")
        
        close = df['Close'].squeeze()
        if isinstance(close, pd.DataFrame):
            close = close.iloc[:, 0]
        close = pd.Series(close.values, dtype=float).dropna()
        last_30 = close.tail(30)
        
        history = [
            {"time": str(i+1), "value": round(float(v), 2)}
            for i, v in enumerate(last_30.values)
        ]
        return {"ticker": ticker, "history": history}
    except Exception as e:
        logging.error(f"History error for {ticker}: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/nifty-sip")
def get_nifty_sip():
    try:
        import yfinance as yf
        df = yf.download('^NSEI', period='1y', interval='1mo', progress=False)
        
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail="Nifty data not found")
        
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)
        
        close = df['Close'].squeeze().dropna()
        
        # Calculate SIP growth (invest 10000 every month)
        monthly_investment = 10000
        sip_data = []
        total_invested = 0
        units = 0
        
        base_price = float(close.iloc[0])
        
        for i, (date, price) in enumerate(zip(close.index, close.values)):
            price = float(price)
            total_invested += monthly_investment
            units += monthly_investment / price
            sip_value = units * price
            
            # Simulate underperforming portfolio (behavioral biases)
            bias_factor = 0.85 - (i * 0.003)
            portfolio_value = sip_value * max(bias_factor, 0.70)
            
            month = date.strftime('%b')
            sip_data.append({
                "month": month,
                "sip": round(sip_value, 0),
                "perf": round(portfolio_value, 0)
            })
        
        return {"data": sip_data}
    except Exception as e:
        logging.error(f"Nifty SIP error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/market-indices")
def get_market_indices():
    try:
        import yfinance as yf
        
        def fetch_index(symbol):
            df = yf.download(symbol, period='5d', interval='1d', progress=False)
            if df is None or df.empty:
                return None, None
            
            # Flatten MultiIndex
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            
            # Get Close as clean 1D series
            close = df['Close']
            if isinstance(close, pd.DataFrame):
                close = close.iloc[:, 0]
            close = pd.Series(close.values, dtype=float).dropna()
            
            if len(close) < 2:
                return None, None
            
            current = round(float(close.iloc[-1]), 2)
            prev = round(float(close.iloc[-2]), 2)
            change_pct = round(((current - prev) / prev) * 100, 2)
            return current, change_pct
        
        nifty_price, nifty_change = fetch_index('^NSEI')
        bank_price, bank_change = fetch_index('^NSEBANK')
        
        return {
            "nifty50": {
                "value": nifty_price,
                "change_pct": nifty_change,
                "signal": "STRONG BUY" if nifty_change and nifty_change > 0.5 else "WEAK SELL" if nifty_change and nifty_change < -0.5 else "NEUTRAL"
            },
            "banknifty": {
                "value": bank_price,
                "change_pct": bank_change,
                "signal": "STRONG BUY" if bank_change and bank_change > 0.5 else "WEAK SELL" if bank_change and bank_change < -0.5 else "NEUTRAL"
            }
        }
    except Exception as e:
        logging.error(f"Market indices error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/watchlist")
def get_watchlist():
    try:
        tickers = ['TCS.NS', 'ICICIBANK.NS', 'ITC.NS', 'SBIN.NS']
        result = []
        for ticker in tickers:
            df = get_stock_data(ticker)
            if df is None or df.empty:
                continue
            close = df['Close']
            if isinstance(close, pd.DataFrame):
                close = close.iloc[:, 0]
            close = pd.Series(close.values, dtype=float).dropna()
            current = round(float(close.iloc[-1]), 2)
            prev = round(float(close.iloc[-2]), 2)
            change_pct = round(((current - prev) / prev) * 100, 2)
            result.append({
                "ticker": ticker.replace('.NS', ''),
                "price": current,
                "change_pct": change_pct
            })
        
        # Fix market sentiment using Nifty data
        nifty_df = get_stock_data('^NSEI')
        sentiment = "Neutral"
        sentiment_pct = 0
        if nifty_df is not None:
            close = nifty_df['Close']
            if isinstance(close, pd.DataFrame):
                close = close.iloc[:, 0]
            close = pd.Series(close.values, dtype=float).dropna()
            current = float(close.iloc[-1])
            prev = float(close.iloc[-2])
            change = round(((current - prev) / prev) * 100, 2)
            sentiment_pct = change
            sentiment = "Bullish" if change > 0.3 else "Bearish" if change < -0.3 else "Neutral"
        
        return {"watchlist": result, "sentiment": sentiment, "sentiment_pct": sentiment_pct}
    except Exception as e:
        logging.error(f"Watchlist error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
