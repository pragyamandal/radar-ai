# Service for handling signal-related operations

import logging
import pandas as pd
import numpy as np
from app.constants import (
    BREAKOUT_THRESHOLD,
    VOLUME_SPIKE_MULTIPLIER,
    RSI_OVERSOLD,
    RSI_OVERBOUGHT,
)

# Configure logging
logger = logging.getLogger(__name__)


def calculate_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    """
    Calculate RSI (Relative Strength Index) indicator.
    
    Args:
        series: Pandas Series of closing prices
        period: RSI period (default 14)
    
    Returns:
        Pandas Series with RSI values
    """
    delta = series.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    
    return rsi


def detect_signals(df: pd.DataFrame, ticker: str) -> dict:
    """
    Detect trading signals from OHLCV data.
    
    Args:
        df: DataFrame with OHLCV columns
        ticker: Stock ticker symbol
    
    Returns:
        Dictionary with signals, signal_count, and signal_story
    """
    signals = []
    signal_story = ""
    
    try:
        # Check if DataFrame has enough data
        if len(df) < 50:
            logger.warning(f"Insufficient data for {ticker}. Need at least 50 rows, got {len(df)}")
            return {"signals": [], "signal_count": 0, "signal_story": "Insufficient data"}
        
        # Get latest values as scalars
        current_close = df["Close"].iloc[-1].item()
        current_volume = df["Volume"].iloc[-1].item()
        
        # Signal 1: Breakout - current close >= 98% of 50-day highest high
        highest_50d = df["High"].rolling(50).max().iloc[-1].item()
        breakout_level = highest_50d * BREAKOUT_THRESHOLD
        if current_close >= breakout_level:
            signals.append("breakout")
        
        # Signal 2: Volume Spike - current volume > 1.5x average volume
        avg_volume = df["Volume"].rolling(20).mean().iloc[-1].item()
        if current_volume > avg_volume * VOLUME_SPIKE_MULTIPLIER:
            signals.append("volume_spike")
        
        # Signal 3: Uptrend - current close > 20-day moving average
        sma_20 = df["Close"].rolling(20).mean().iloc[-1].item()
        if current_close > sma_20:
            signals.append("uptrend")
        
        # Signal 4: RSI Momentum - RSI between 50 and 70 (bullish momentum)
        rsi = calculate_rsi(df["Close"])
        current_rsi = rsi.iloc[-1].item()
        if 50 < current_rsi < 70:
            signals.append("rsi_momentum")
        
        # Generate signal story
        if signals:
            signal_story = f"{ticker}: {', '.join(signals)} detected"
        else:
            signal_story = f"{ticker}: No trading signals detected"
        
        logger.info(f"{signal_story}")
        
        return {
            "signals": signals,
            "signal_count": len(signals),
            "signal_story": signal_story
        }
    
    except Exception as e:
        logger.error(f"Error detecting signals for {ticker}: {str(e)}")
        return {"signals": [], "signal_count": 0, "signal_story": f"Error: {str(e)}"}
