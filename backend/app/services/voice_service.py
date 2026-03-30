try:
    import edge_tts
    EDGE_TTS_AVAILABLE = True
except ImportError:
    EDGE_TTS_AVAILABLE = False

async def text_to_speech(text: str, output_path: str = "output.mp3"):
    if not EDGE_TTS_AVAILABLE:
        return None
    try:
        communicate = edge_tts.Communicate(text, "en-IN-NeerjaNeural")
        await communicate.save(output_path)
        return output_path
    except Exception as e:
        return None