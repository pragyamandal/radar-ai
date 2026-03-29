# Schemas for data models in Radar AI

from pydantic import BaseModel
from typing import Optional, List


class BacktestStats(BaseModel):
    """Schema for backtest statistics."""
    median_return: float
    best_return: float
    worst_return: float
    win_rate: float
    total_trades: int


class Opportunity(BaseModel):
    """Schema for a trading opportunity."""
    ticker: str
    signals: List[str]
    signal_count: int
    signal_story: str
    risk_level: str
    backtest: Optional[BacktestStats] = None


class RadarResponse(BaseModel):
    """Schema for radar analysis response."""
    opportunities: List[Opportunity]
    do_nothing: bool
    message: str


class Trade(BaseModel):
    """Schema for a trade record."""
    ticker: str
    action: str
    price_change_at_buy: float
    days_held: int
    return_pct: float
