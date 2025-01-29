import whisper

def get_transcript(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    transcript = result["text"]
    filename = audio_path.split(".")[0]
    with open(filename + ".txt", 'w') as f:
        f.write(transcript)
    return transcript

get_transcript("audio.mp3")