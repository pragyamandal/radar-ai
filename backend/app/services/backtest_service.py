# Service for handling backtesting operations

import logging
import pandas as pd
import numpy as np

# Configure logging
logger = logging.getLogger(__name__)


def run_backtest(df: pd.DataFrame, holding_days: int = 30):
    try:
        if df is None or df.empty:
            return None
        
        # Deep copy to avoid modifying original
        df = df.copy()
        
        # Flatten MultiIndex columns
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = [col[0] for col in df.columns]
        
        # Get Close as clean 1D series
        if 'Close' not in df.columns:
            return None
            
        close = df['Close']
        if isinstance(close, pd.DataFrame):
            close = close.iloc[:, 0]
        close = pd.Series(close.values, dtype=float)
        close = close.dropna().reset_index(drop=True)
        
        if len(close) < holding_days + 5:
            return None
        
        returns = []
        for i in range(len(close) - holding_days):
            buy = close.iloc[i]
            sell = close.iloc[i + holding_days]
            if buy > 0:
                ret = ((sell - buy) / buy) * 100
                returns.append(float(ret))
        
        if len(returns) < 5:
            return None
            
        return {
            "median_return": round(float(np.median(returns)), 2),
            "best_return": round(float(np.max(returns)), 2),
            "worst_return": round(float(np.min(returns)), 2),
            "win_rate": round(sum(1 for r in returns if r > 0) / len(returns) * 100, 1),
            "total_trades": len(returns)
        }
    except Exception as e:
        logging.error(f"Backtest error: {e}")
        return None
