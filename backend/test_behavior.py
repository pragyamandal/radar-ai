import sys
sys.path.append(".")

from app.services.behavior_service import analyze_behavior

# Sample trade history (simulating a user's past trades)
trade_history = [
    {
        "ticker": "RELIANCE.NS",
        "action": "BUY",
        "price_change_at_buy": 8.5,
        "days_held": 3,
        "return_pct": -4.2,
        "portfolio_pct": 25
    },
    {
        "ticker": "TCS.NS",
        "action": "BUY",
        "price_change_at_buy": 6.0,
        "days_held": 5,
        "return_pct": -2.1,
        "portfolio_pct": 15
    },
    {
        "ticker": "INFY.NS",
        "action": "BUY",
        "price_change_at_buy": 2.0,
        "days_held": 30,
        "return_pct": 5.5,
        "portfolio_pct": 10
    },
    {
        "ticker": "HDFCBANK.NS",
        "action": "BUY",
        "price_change_at_buy": 1.0,
        "days_held": 45,
        "return_pct": 3.2,
        "portfolio_pct": 30
    }
]

result = analyze_behavior(trade_history)

print(f"✅ Behaviour Analysis Complete!")
print(f"   Score: {result['behaviour_score']}/100")
print(f"   Summary: {result['summary']}")
print(f"   Warnings: {result['warnings']}")
print(f"   Spike Chasing: {result['spike_chasing']}")
print(f"   Panic Selling: {result['panic_selling']}")
print(f"   Overconcentration: {result['overconcentration']}")
