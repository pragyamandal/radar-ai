# Service for handling behavior-related operations

import logging

# Configure logging
logger = logging.getLogger(__name__)


def analyze_behavior(trade_history: list) -> dict:
    """
    Analyze trading behavior patterns and provide coaching feedback.
    
    Args:
        trade_history: List of trade dictionaries with ticker, action, price_change_at_buy,
                      days_held, return_pct, portfolio_pct
    
    Returns:
        Dictionary with behaviour_score, warnings, and behavior pattern analysis
    """
    try:
        if not trade_history:
            logger.warning("Empty trade history provided")
            return {
                "behaviour_score": 100,
                "warnings": [],
                "spike_chasing": {"count": 0, "losses": 0},
                "panic_selling": {"count": 0},
                "overconcentration": {"stocks": []},
                "summary": "No trades to analyze"
            }
        
        behaviour_score = 100
        warnings = []
        
        # Pattern 1: Spike Chasing - buying when price up > 5%
        spike_chasing_count = 0
        spike_chasing_losses = 0
        
        for trade in trade_history:
            if trade.get("action") == "BUY" and trade.get("price_change_at_buy", 0) > 5:
                spike_chasing_count += 1
                if trade.get("return_pct", 0) < 0:
                    spike_chasing_losses += 1
        
        if spike_chasing_count > 0:
            behaviour_score -= (spike_chasing_count * 10)
            warnings.append(f"Spike chasing detected: {spike_chasing_count} times (lost money {spike_chasing_losses} times)")
            logger.info(f"Spike chasing pattern: {spike_chasing_count} occurrences")
        
        # Pattern 2: Panic Selling - selling after < 7 days with negative return
        panic_selling_count = 0
        
        for trade in trade_history:
            if (trade.get("action") == "SELL" and 
                trade.get("days_held", 0) < 7 and 
                trade.get("return_pct", 0) < 0):
                panic_selling_count += 1
        
        if panic_selling_count > 0:
            behaviour_score -= (panic_selling_count * 15)
            warnings.append(f"Panic selling detected: {panic_selling_count} times")
            logger.info(f"Panic selling pattern: {panic_selling_count} occurrences")
        
        # Pattern 3: Overconcentration - single stock > 20% of portfolio
        overconcentrated_stocks = []
        
        for trade in trade_history:
            portfolio_pct = trade.get("portfolio_pct", 0)
            if portfolio_pct > 20:
                ticker = trade.get("ticker", "UNKNOWN")
                if ticker not in overconcentrated_stocks:
                    overconcentrated_stocks.append(ticker)
        
        if overconcentrated_stocks:
            behaviour_score -= (len(overconcentrated_stocks) * 20)
            warnings.append(f"Overconcentration detected in: {', '.join(overconcentrated_stocks)}")
            logger.info(f"Overconcentration pattern: {overconcentrated_stocks}")
        
        # Ensure score doesn't go below 0
        behaviour_score = max(0, behaviour_score)
        
        # Generate summary
        if behaviour_score >= 80:
            summary = "Excellent trading behavior - disciplined and risk-aware"
        elif behaviour_score >= 60:
            summary = "Good trading behavior - some areas for improvement"
        elif behaviour_score >= 40:
            summary = "Fair trading behavior - significant improvements needed"
        else:
            summary = "Poor trading behavior - urgent coaching recommended"
        
        result = {
            "behaviour_score": behaviour_score,
            "warnings": warnings,
            "spike_chasing": {"count": spike_chasing_count, "losses": spike_chasing_losses},
            "panic_selling": {"count": panic_selling_count},
            "overconcentration": {"stocks": overconcentrated_stocks},
            "summary": summary
        }
        
        logger.info(f"Behavior analysis complete: score={behaviour_score}, summary='{summary}'")
        return result
    
    except Exception as e:
        logger.error(f"Error analyzing behavior: {str(e)}")
        return {
            "behaviour_score": 0,
            "warnings": [f"Error: {str(e)}"],
            "spike_chasing": {"count": 0, "losses": 0},
            "panic_selling": {"count": 0},
            "overconcentration": {"stocks": []},
            "summary": "Unable to analyze behavior"
        }
