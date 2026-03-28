import sys
sys.path.append(".")

from app.services.data_service import get_multiple_stocks
from app.services.signal_service import detect_signals
from app.constants import NIFTY_STOCKS

data = get_multiple_stocks(NIFTY_STOCKS)

print(f"✅ Fetched data for {len(data)} stocks\n")

for ticker, df in data.items():
    result = detect_signals(df, ticker)
    if result["signal_count"] > 0:
        print(f"🔥 {ticker}")
        print(f"   Signals: {result['signals']}")
        print(f"   Count: {result['signal_count']}")
        print(f"   Story: {result['signal_story']}")
        print()

print("✅ Signal scan complete!")
