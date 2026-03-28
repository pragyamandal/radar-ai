# Routes for Radar AI endpoints

import logging
from fastapi import APIRouter, HTTPException
from app.pipelines.radar_pipeline import run_radar_pipeline

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/radar", tags=["radar"])


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
