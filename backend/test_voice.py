import sys
sys.path.append(".")

from app.services.voice_service import text_to_speech

text = """
Sun Pharma is showing strong uptrend with high volume. 
This stock has been consistently climbing up. 
Historical data shows 61 percent win rate. 
Consider buying a small amount for short term gains.
"""

print("🎙️ Generating audio...")
result = text_to_speech(text, "SUNPHARMA")

if result:
    print(f"✅ Audio generated successfully!")
    print(f"   File: {result}")
else:
    print("❌ Failed to generate audio")

