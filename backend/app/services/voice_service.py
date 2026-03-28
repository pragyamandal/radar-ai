# Service for generating audio using Edge TTS

import edge_tts
import asyncio
import logging
import os
from pathlib import Path

# Configure logging
logger = logging.getLogger(__name__)

# Available voices for TTS
AVAILABLE_VOICES = [
    "en-IN-NeerjaNeural",  # Indian English Female
    "en-IN-PrabhatNeural",  # Indian English Male
    "hi-IN-SwaraNeural",    # Hindi Female
    "hi-IN-MadhurNeural"    # Hindi Male
]


async def generate_audio(text: str, filename: str, voice: str = "en-IN-NeerjaNeural") -> str | None:
    """
    Generate audio from text using Edge TTS.
    
    Args:
        text: Text to convert to speech
        filename: Path to save the audio file
        voice: Voice to use (default: Indian English Female)
    
    Returns:
        Filename if successful, None if failed
    """
    try:
        logger.info(f"Generating audio with voice: {voice}")
        
        # Create communicate instance
        communicate = edge_tts.Communicate(text=text, voice=voice, rate="+0%", volume="+0%")
        
        # Save audio to file
        await communicate.save(filename)
        
        logger.info(f"Audio saved to: {filename}")
        return filename
    
    except Exception as e:
        logger.error(f"Error generating audio: {str(e)}")
        return None


def text_to_speech(text: str, ticker: str, voice: str = "en-IN-NeerjaNeural") -> str | None:
    """
    Convert text to speech and save as MP3 file.
    
    Args:
        text: Text to convert to speech
        ticker: Stock ticker (used in filename)
        voice: Voice to use (default: Indian English Female)
    
    Returns:
        File path if successful, None if failed
    """
    try:
        # Create output filename
        audio_filename = f"audio_{ticker}.mp3"
        
        # Create full path in app/static/ folder
        static_dir = Path(__file__).parent.parent / "static"
        static_dir.mkdir(parents=True, exist_ok=True)
        
        full_path = str(static_dir / audio_filename)
        
        logger.info(f"Converting text to speech for {ticker}")
        
        # Generate audio using asyncio
        result = asyncio.run(generate_audio(text, full_path, voice))
        
        if result:
            logger.info(f"Audio generated successfully: {full_path}")
            return full_path
        else:
            logger.error(f"Failed to generate audio for {ticker}")
            return None
    
    except Exception as e:
        logger.error(f"Error in text_to_speech: {str(e)}")
        return None
