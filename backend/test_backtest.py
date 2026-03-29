import sys
sys.path.append(".")

from app.services.data_service import get_stock_data
from app.services.backtest_service import run_backtest

tickers = ["RELIANCE.NS", "HDFCBANK.NS", "TCS.NS"]

for ticker in tickers:
    df = get_stock_data(ticker)
    if df is not None:
        result = run_backtest(df)
        if result:
            print(f"✅ {ticker}")
            print(f"   Median Return: {result['median_return']}%")
            print(f"   Best Return: {result['best_return']}%")
            print(f"   Worst Return: {result['worst_return']}%")
            print(f"   Win Rate: {result['win_rate']}%")
            print(f"   Total Trades: {result['total_trades']}")
            print()
        else:
            print(f"❌ {ticker} - Not enough data")
