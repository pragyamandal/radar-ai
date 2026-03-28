# Service for handling backtesting operations

import logging
import pandas as pd
import numpy as np

# Configure logging
logger = logging.getLogger(__name__)


def run_backtest(df: pd.DataFrame, holding_days: int = 30) -> dict | None:
    """
    Run backtest simulation on historical stock data.
    
    Args:
        df: DataFrame with OHLCV data and Close prices
        holding_days: Number of days to hold each position (default 30)
    
    Returns:
        Dictionary with backtest metrics or None if insufficient data
    """
    try:
        # Check if DataFrame has enough data
        min_rows = holding_days + 10
        if len(df) < min_rows:
            logger.warning(f"Insufficient data for backtest. Need at least {min_rows} rows, got {len(df)}")
            return None
        
        returns = []
        
        # Simulate trades for each day (except last holding_days days)
        for i in range(len(df) - holding_days):
            buy_price = df["Close"].iloc[i].item()
            sell_price = df["Close"].iloc[i + holding_days].item()
            
            # Calculate return percentage
            return_pct = ((sell_price - buy_price) / buy_price) * 100
            returns.append(return_pct)
        
        # Calculate metrics
        returns_array = np.array(returns)
        median_return = round(np.median(returns_array), 2)
        best_return = round(np.max(returns_array), 2)
        worst_return = round(np.min(returns_array), 2)
        total_trades = len(returns)
        win_rate = round((np.sum(returns_array > 0) / total_trades) * 100, 1)
        
        logger.info(f"Backtest completed: {total_trades} trades, {win_rate}% win rate")
        
        return {
            "median_return": median_return,
            "best_return": best_return,
            "worst_return": worst_return,
            "total_trades": total_trades,
            "win_rate": win_rate
        }
    
    except Exception as e:
        logger.error(f"Error running backtest: {str(e)}")
        return None
