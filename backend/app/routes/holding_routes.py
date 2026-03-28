# Holdings management routes for Radar AI

import logging
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from app.models.database import get_db, UserHoldings, TradeHistory

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/holdings", tags=["holdings"])


# Pydantic models
class HoldingRequest(BaseModel):
    user_id: int
    ticker: str
    quantity: float
    buy_price: float


class TradeRequest(BaseModel):
    user_id: int
    ticker: str
    action: str  # BUY or SELL
    price_change_at_buy: float
    days_held: int
    return_pct: float
    portfolio_pct: float


class HoldingResponse(BaseModel):
    id: int
    user_id: int
    ticker: str
    quantity: float
    buy_price: float
    created_at: str


class TradeResponse(BaseModel):
    id: int
    user_id: int
    ticker: str
    action: str
    price_change_at_buy: float
    days_held: int
    return_pct: float
    portfolio_pct: float
    created_at: str


# Endpoints
@router.post("/add")
def add_holding(request: HoldingRequest, db: Session = Depends(get_db)):
    """
    Add a new stock holding for user.
    
    Args:
        request: HoldingRequest with user_id, ticker, quantity, buy_price
        db: Database session
    
    Returns:
        Success message with holding_id
    """
    try:
        logger.info(f"Adding holding for user {request.user_id}: {request.ticker}")
        
        # Create new holding
        holding = UserHoldings(
            user_id=request.user_id,
            ticker=request.ticker,
            quantity=request.quantity,
            buy_price=request.buy_price
        )
        
        # Add to database
        db.add(holding)
        db.commit()
        db.refresh(holding)
        
        logger.info(f"Holding added successfully: {request.ticker} (ID: {holding.id})")
        
        return {
            "message": "Holding added",
            "holding_id": holding.id
        }
    
    except Exception as e:
        logger.error(f"Error adding holding: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to add holding: {str(e)}")


@router.get("/{user_id}")
def get_holdings(user_id: int, db: Session = Depends(get_db)):
    """
    Get all holdings for a user.
    
    Args:
        user_id: User ID
        db: Database session
    
    Returns:
        List of holdings
    """
    try:
        logger.info(f"Fetching holdings for user {user_id}")
        
        # Get all holdings for user
        holdings = db.query(UserHoldings).filter(UserHoldings.user_id == user_id).all()
        
        logger.info(f"Retrieved {len(holdings)} holdings for user {user_id}")
        
        return [
            {
                "id": h.id,
                "user_id": h.user_id,
                "ticker": h.ticker,
                "quantity": h.quantity,
                "buy_price": h.buy_price,
                "created_at": str(h.created_at)
            }
            for h in holdings
        ]
    
    except Exception as e:
        logger.error(f"Error fetching holdings: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch holdings: {str(e)}")


@router.delete("/{holding_id}")
def delete_holding(holding_id: int, db: Session = Depends(get_db)):
    """
    Delete a holding by ID.
    
    Args:
        holding_id: Holding ID
        db: Database session
    
    Returns:
        Success message
    """
    try:
        logger.info(f"Deleting holding {holding_id}")
        
        # Find holding
        holding = db.query(UserHoldings).filter(UserHoldings.id == holding_id).first()
        if not holding:
            logger.warning(f"Holding not found: {holding_id}")
            raise HTTPException(status_code=404, detail="Holding not found")
        
        # Delete holding
        db.delete(holding)
        db.commit()
        
        logger.info(f"Holding deleted successfully: {holding_id}")
        
        return {"message": "Holding removed"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting holding: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete holding: {str(e)}")


@router.post("/trade")
def record_trade(request: TradeRequest, db: Session = Depends(get_db)):
    """
    Record a trade in trade history.
    
    Args:
        request: TradeRequest with trade details
        db: Database session
    
    Returns:
        Success message
    """
    try:
        logger.info(f"Recording trade for user {request.user_id}: {request.action} {request.ticker}")
        
        # Create new trade record
        trade = TradeHistory(
            user_id=request.user_id,
            ticker=request.ticker,
            action=request.action,
            price_change_at_buy=request.price_change_at_buy,
            days_held=request.days_held,
            return_pct=request.return_pct,
            portfolio_pct=request.portfolio_pct
        )
        
        # Add to database
        db.add(trade)
        db.commit()
        db.refresh(trade)
        
        logger.info(f"Trade recorded successfully: {request.ticker} (ID: {trade.id})")
        
        return {
            "message": "Trade recorded",
            "trade_id": trade.id
        }
    
    except Exception as e:
        logger.error(f"Error recording trade: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to record trade: {str(e)}")


@router.get("/trades/{user_id}")
def get_trades(user_id: int, db: Session = Depends(get_db)):
    """
    Get all trades for a user.
    
    Args:
        user_id: User ID
        db: Database session
    
    Returns:
        List of trades
    """
    try:
        logger.info(f"Fetching trades for user {user_id}")
        
        # Get all trades for user
        trades = db.query(TradeHistory).filter(TradeHistory.user_id == user_id).all()
        
        logger.info(f"Retrieved {len(trades)} trades for user {user_id}")
        
        return [
            {
                "id": t.id,
                "user_id": t.user_id,
                "ticker": t.ticker,
                "action": t.action,
                "price_change_at_buy": t.price_change_at_buy,
                "days_held": t.days_held,
                "return_pct": t.return_pct,
                "portfolio_pct": t.portfolio_pct,
                "created_at": str(t.created_at)
            }
            for t in trades
        ]
    
    except Exception as e:
        logger.error(f"Error fetching trades: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch trades: {str(e)}")
