from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import logging
import requests
import json

app = Flask(__name__)
CORS(app)

# Initialize logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize whisper model
try:
    whisper_model = whisper.load_model("base")
    logger.info("Whisper model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load whisper model: {str(e)}")
    raise

OLLAMA_API_BASE = "http://localhost:11434/api"

def generate_llama_response(prompt):
    try:
        response = requests.post(
            f"{OLLAMA_API_BASE}/generate",
            json={
                "model": "llama2",
                "prompt": prompt,
                "stream": False
            }
        )
        response.raise_for_status()
        return response.json()['response']
    except Exception as e:
        logger.error(f"Ollama API error: {str(e)}")
        raise

@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    text = data.get('text')
    option = data.get('option')

    if not text or not option:
        return jsonify({'error': 'Missing text or option'}), 400

    try:
        if option == 'summary':
            prompt = f"""Please provide a concise summary of the following text. Focus on the main points and key takeaways:

Text: {text}

Summary:"""
            result = generate_llama_response(prompt)
            return jsonify({'result': result})

        elif option == 'questions':
            prompt = f"""Generate 5 thoughtful study questions based on this text. Make sure the questions test understanding of key concepts:

Text: {text}

Questions:"""
            result = generate_llama_response(prompt)
            return jsonify({'result': result})

        elif option == 'quiz':
            prompt = f"""Create a multiple-choice quiz with 5 questions based on this text. 
For each question, provide 4 options and indicate the correct answer.
Format your response as follows:

Question 1: [Question text]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Correct Answer: [Letter]

Text: {text}

Quiz:"""
            result = generate_llama_response(prompt)
            return jsonify({'result': result})

        elif option == 'chat':
            return jsonify({'result': 'Chat session initialized. You can now start asking questions about the text.'})

    except Exception as e:
        logger.error(f"Processing error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    context = data.get('context')
    
    if not message or not context:
        return jsonify({'error': 'Missing message or context'}), 400

    try:
        prompt = f"""Context: The following is a transcription of some content:
{context}

Based on the above context, please respond to this message:
{message}

Response:"""
        
        response = generate_llama_response(prompt)
        return jsonify({'response': response})
    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 