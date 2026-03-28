# Pipeline logic for Radar AI

import logging
from app.services.data_service import get_multiple_stocks
from app.services.signal_service import detect_signals
from app.services.backtest_service import run_backtest
from app.constants import NIFTY_STOCKS, TOP_OPPORTUNITIES, MIN_SIGNALS_REQUIRED

# Configure logging
logger = logging.getLogger(__name__)


def run_radar_pipeline(tickers: list = None) -> dict:
    """
    Run the complete Radar AI pipeline to identify trading opportunities.
    
    Args:
        tickers: List of stock tickers to analyze (default NIFTY_STOCKS)
    
    Returns:
        Dictionary with opportunities, do_nothing flag, and message
    """
    try:
        # Use default tickers if not provided
        if tickers is None:
            tickers = NIFTY_STOCKS
        
        logger.info(f"Starting Radar pipeline for {len(tickers)} stocks")
        
        # Fetch data for all tickers
        stock_data = get_multiple_stocks(tickers)
        logger.info(f"Fetched data for {len(stock_data)} stocks")
        
        opportunities = []
        
        # Analyze each stock
        for ticker, df in stock_data.items():
            # Detect signals
            signal_result = detect_signals(df, ticker)
            signal_count = signal_result["signal_count"]
            
            # Skip if insufficient signals
            if signal_count < MIN_SIGNALS_REQUIRED:
                logger.debug(f"Skipping {ticker}: insufficient signals ({signal_count})")
                continue
            
            # Run backtest
            backtest_result = run_backtest(df)
            
            # Determine risk level
            if signal_count >= 3:
                risk_level = "Aggressive"
            elif signal_count == 2:
                risk_level = "Moderate"
            else:
                risk_level = "Conservative"
            
            # Build opportunity dictionary
            opportunity = {
                "ticker": ticker,
                "signals": signal_result["signals"],
                "signal_count": signal_count,
                "signal_story": signal_result["signal_story"],
                "backtest": backtest_result,
                "risk_level": risk_level
            }
            
            opportunities.append(opportunity)
            logger.info(f"Added opportunity: {ticker} ({signal_count} signals)")
        
        # Sort by signal_count descending
        opportunities.sort(key=lambda x: x["signal_count"], reverse=True)
        
        # Get top opportunities
        top_opportunities = opportunities[:TOP_OPPORTUNITIES]
        
        # Determine response
        if not top_opportunities:
            logger.info("No trading opportunities found")
            return {
                "opportunities": [],
                "do_nothing": True,
                "message": "No stocks meet the minimum signal requirements"
            }
        
        logger.info(f"Pipeline complete: {len(top_opportunities)} opportunities identified")
        return {
            "opportunities": top_opportunities,
            "do_nothing": False,
            "message": f"Found {len(top_opportunities)} trading opportunities"
        }
    
    except Exception as e:
        logger.error(f"Error running Radar pipeline: {str(e)}")
        return {
            "opportunities": [],
            "do_nothing": True,
            "message": f"Pipeline error: {str(e)}"
        }
