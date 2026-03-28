# Service for handling data-related operations

import logging
import yfinance as yf
import pandas as pd
from app.constants import NIFTY_STOCKS, LOOKBACK_PERIOD

# Configure logging
logger = logging.getLogger(__name__)

# In-memory cache for stock data
_data_cache = {}


def get_stock_data(ticker: str) -> pd.DataFrame | None:
    """
    Fetch historical stock data for a given ticker.
    
    Args:
        ticker: Stock ticker symbol (e.g., "RELIANCE.NS")
    
    Returns:
        pandas DataFrame with OHLCV data or None if fetch fails
    """
    # Check cache first
    if ticker in _data_cache:
        logger.debug(f"Returning cached data for {ticker}")
        return _data_cache[ticker]
    
    try:
        logger.info(f"Fetching data for {ticker}")
        data = yf.download(ticker, period=LOOKBACK_PERIOD, progress=False)
        
        # Select relevant columns
        data = data[["Open", "High", "Low", "Close", "Volume"]]
        
        # Drop missing values
        data = data.dropna()
        
        # Cache the result
        _data_cache[ticker] = data
        
        logger.info(f"Successfully fetched data for {ticker}")
        return data
    
    except Exception as e:
        logger.error(f"Error fetching data for {ticker}: {str(e)}")
        return None


def get_multiple_stocks(tickers: list) -> dict:
    """
    Fetch historical data for multiple stocks.
    
    Args:
        tickers: List of stock ticker symbols
    
    Returns:
        Dictionary mapping ticker to DataFrame
    """
    stock_data = {}
    
    for ticker in tickers:
        data = get_stock_data(ticker)
        if data is not None:
            stock_data[ticker] = data
    
    logger.info(f"Retrieved data for {len(stock_data)}/{len(tickers)} stocks")
    return stock_data
