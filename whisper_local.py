import whisper
from transformers import pipeline


def get_transcript(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    transcript = result["text"]
    filename = audio_path.split(".")[0]
    with open(filename + ".txt", 'w') as f:
        f.write(transcript)
    return transcript


summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
text = " Wow, what an audience. But if I'm being honest, I don't care what you think of my talk. I don't. I care what the internet thinks of my talk. Because they're the ones who get it seen and get it shared. And I think that's where most people get it wrong. They're talking to you here. Instead of talking to you, random person scrolling Facebook. Thanks for the click. You see, back in 2009, we all have these weird little things called attention spans. Yeah, they're gone. They're gone. We killed them. They're dead. I'm trying to think of the last time I watched an 18-minute TED talk. It's been years, literally years. So if you're given a TED talk, keep it quick. I'm doing mine in under a minute. I'm at 44 seconds right now. That means we've got time for one final joke. Why are balloons so expensive? Inflation."
summary = summarizer(text, max_length=50, min_length=25, do_sample=False)
print(summary[0]['summary_text'])

# get_transcript("audio.mp3")