# Service for generating AI explanations using NVIDIA Kimi K2 API

import logging
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Configure logging
logger = logging.getLogger(__name__)

# Initialize NVIDIA Kimi K2 client
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
NVIDIA_BASE_URL = os.getenv("NVIDIA_BASE_URL")

# Validate API key
if NVIDIA_API_KEY is None:
    logger.error("NVIDIA_API_KEY not found in environment variables")
    raise ValueError("NVIDIA_API_KEY is required")

client = OpenAI(
    base_url=NVIDIA_BASE_URL,
    api_key=NVIDIA_API_KEY
)


def generate_explanation(opportunity: dict) -> dict | None:
    """
    Generate AI explanation for a stock opportunity using NVIDIA Kimi K2.
    
    Args:
        opportunity: Dictionary with ticker, signals, signal_story, risk_level, backtest
    
    Returns:
        Dictionary with explanation and ticker, or None if error occurs
    """
    try:
        ticker = opportunity.get("ticker", "UNKNOWN")
        signals = opportunity.get("signals", [])
        signal_story = opportunity.get("signal_story", "")
        risk_level = opportunity.get("risk_level", "Unknown")
        backtest = opportunity.get("backtest", {})
        
        # Build prompt for Kimi
        prompt = f"""
You are a stock market coach for Indian retail investors. Explain this stock opportunity in simple, easy-to-understand language.

Stock: {ticker}
Signals Detected: {', '.join(signals)}
Signal Summary: {signal_story}
Risk Level: {risk_level}

Backtest Performance:
- Median Return: {backtest.get('median_return', 'N/A')}%
- Best Return: {backtest.get('best_return', 'N/A')}%
- Worst Return: {backtest.get('worst_return', 'N/A')}%
- Win Rate: {backtest.get('win_rate', 'N/A')}%
- Total Trades: {backtest.get('total_trades', 'N/A')}

Please explain:
1. Why was this stock selected? (1-2 sentences)
2. What does each signal mean for this stock? (2-3 sentences)
3. What do these backtest numbers tell us? (1-2 sentences)
4. What action should an investor consider and why? (1-2 sentences)

Keep your explanation under 150 words. Use simple English .
"""
        
        logger.info(f"Generating explanation for {ticker} using Kimi K2")
        
        # Call NVIDIA Kimi K2 API with streaming
        completion = client.chat.completions.create(
            model="moonshotai/kimi-k2-thinking",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=1,
            top_p=0.9,
            max_tokens=1024,
            stream=True
        )
        
        # Collect streamed response
        full_response = ""
        reasoning_response = ""
        for chunk in completion:
            if not getattr(chunk, "choices", None):
                continue
            delta = chunk.choices[0].delta
            
            reasoning = getattr(delta, "reasoning_content", None)
            content = getattr(delta, "content", None)
            
            if reasoning:
                reasoning_response += reasoning
            if content:
                full_response += content
        
        if full_response and len(full_response.strip()) > 50:
            explanation = full_response.strip()
        elif reasoning_response:
            # Extract final structured answer from reasoning
            import re
            # Try to find where the actual answer starts
            patterns = [
                r'(?:Draft \d+:|Final answer:|Let me structure|Here is the|Here\'s the)\s*\n',
                r'\*\*1\.',
                r'(?<!\*\*)1\. (?:Why|Bharti|The stock|This stock)'
            ]
            explanation = reasoning_response
            for pattern in patterns:
                match = re.search(pattern, reasoning_response, re.IGNORECASE)
                if match:
                    candidate = reasoning_response[match.start():]
                    if len(candidate) > 100:
                        explanation = candidate
                        break
            # Clean up any remaining prompt-like text
            explanation = explanation.strip()
        else:
            return None

        logger.info(f"Explanation generated for {ticker}: {len(explanation)} characters")

        return {
            "explanation": explanation,
            "ticker": ticker
        }
    
    except Exception as e:
        logger.error(f"Error generating explanation: {str(e)}")
        return None
