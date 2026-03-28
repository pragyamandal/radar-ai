import sys
sys.path.append(".")

from app.services.explanation_service import generate_explanation

# Sample opportunity (simulating radar output)
opportunity = {
    "ticker": "SUNPHARMA.NS",
    "signals": ["uptrend", "volume_spike"],
    "signal_story": "SUNPHARMA showing strong uptrend with volume spike",
    "risk_level": "Moderate",
    "backtest": {
        "median_return": 2.86,
        "best_return": 12.5,
        "worst_return": -4.2,
        "win_rate": 61.3
    }
}

result = generate_explanation(opportunity)

if result:
    print(f"✅ Explanation generated!")
    print(f"Ticker: {result['ticker']}")
    print(f"\nExplanation:\n{result['explanation']}")
else:
    print("❌ Failed to generate explanation")
