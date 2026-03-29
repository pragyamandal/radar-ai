import sys
sys.path.append(".")

from app.services.data_service import get_stock_data

df = get_stock_data("RELIANCE.NS")
if df is not None:
    print("✅ Data fetched successfully!")
    print(df.tail())
else:
    print("❌ Failed to fetch data")

