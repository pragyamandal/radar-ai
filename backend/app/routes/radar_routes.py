# Routes for Radar AI endpoints

import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.pipelines.radar_pipeline import run_radar_pipeline
from app.services.explanation_service import generate_explanation

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
