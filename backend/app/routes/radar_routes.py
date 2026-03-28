# Routes for Radar AI endpoints

import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from app.pipelines.radar_pipeline import run_radar_pipeline
from app.services.explanation_service import generate_explanation
from app.agents.radar_agent import run_agent_pipeline
from app.services.voice_service import text_to_speech
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
