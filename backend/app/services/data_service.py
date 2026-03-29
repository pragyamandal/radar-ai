import pandas as pd
import logging
from app.constants import LOOKBACK_PERIOD

logger = logging.getLogger(__name__)

def get_stock_data(ticker: str):
    try:
        import yfinance as yf
        df = yf.download(ticker, period=LOOKBACK_PERIOD, progress=False, auto_adjust=True)
        
        if df is None or df.empty:
            logger.warning(f"No data for {ticker}")
            return None
        
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)
        
        last_close = float(df['Close'].iloc[-1])
        logger.info(f"✅ {ticker} = {last_close:.2f}")
        
        return df.dropna()
        
    except Exception as e:
        logger.error(f"Error fetching {ticker}: {e}")
        return None

def get_multiple_stocks(tickers: list):
    result = {}
    for ticker in tickers:
        df = get_stock_data(ticker)
        if df is not None:
            result[ticker] = df
    return result

def clear_cache():
    logger.info("Cache disabled - no-op")