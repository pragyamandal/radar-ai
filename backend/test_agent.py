import sys
sys.path.append(".")

from app.agents.radar_agent import run_agent_pipeline

print("🤖 Running LangGraph Agent Pipeline...")
print()

result = run_agent_pipeline()

print(f"Do Nothing: {result['do_nothing']}")
print(f"Message: {result['message']}")
print(f"Opportunities Found: {len(result['opportunities'])}")
print()

for opp in result['opportunities']:
    print(f"🔥 {opp['ticker']}")
    print(f"   Signals: {opp['signals']}")
    print(f"   Risk Level: {opp['risk_level']}")
    print(f"   Story: {opp['signal_story']}")
    if opp['backtest']:
        print(f"   Median Return: {opp['backtest']['median_return']}%")
        print(f"   Win Rate: {opp['backtest']['win_rate']}%")
    print()

print("✅ Agent pipeline complete!")

