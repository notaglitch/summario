# import os
# import dotenv
# import openai
import os
import whisper

# dotenv.load_dotenv()
# whisper_api_key = os.getenv('WHISPER_API_KEY')  # Fixed variable name
# gemini_api_key = os.getenv('GEMINI_API_KEY')    # Fixed variable name

# Load the model and check if it has been downloaded
try:
    model = whisper.load_model("base")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")

# Check if the model files exist (adjust the path as necessary)
model_path = whisper.get_model_path("base")  # Hypothetical function to get model path
if os.path.exists(model_path):
    print("Model files are present.")
else:
    print("Model files are missing.")

result = model.transcribe("audio.mp3")
print(result["text"])
