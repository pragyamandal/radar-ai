# Routes for Coach-related endpoints

import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.behavior_service import analyze_behavior

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/coach", tags=["coach"])


# Request model
class Trade(BaseModel):
    ticker: str
    action: str
    price_change_at_buy: float
    days_held: int
    return_pct: float
    portfolio_pct: float


class CoachRequest(BaseModel):
    trade_history: list[Trade]


@router.get("/health")
def health_check():
    """
    Health check endpoint for the Coach service.
    
    Returns:
        Status and service information
    """
    logger.info("Health check request received")
    return {"status": "ok", "service": "coach"}


@router.post("")
def get_behavior_coaching(request: CoachRequest):
    """
    Get behavior analysis and coaching feedback.
    
    Args:
        request: CoachRequest with trade_history
    
    Returns:
        Dictionary with behaviour_score, warnings, and behavior patterns
    """
    try:
        logger.info(f"Behavior coaching request received for {len(request.trade_history)} trades")
        
        # Convert Trade objects to dictionaries
        trade_history = [trade.dict() for trade in request.trade_history]
        
        result = analyze_behavior(trade_history)
        logger.info(f"Behavior analysis completed: score={result['behaviour_score']}")
        return result
    
    except Exception as e:
        logger.error(f"Error in behavior coaching: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Behavior analysis failed: {str(e)}")
