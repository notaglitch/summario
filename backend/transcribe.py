import whisper
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Whisper model
try:
    model = whisper.load_model("base")
    logger.info("Whisper model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load Whisper model: {str(e)}")
    raise

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    logger.info("Received transcription request")
    
    if 'file' not in request.files:
        logger.error("No file in request")
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.error("Empty filename")
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Save the uploaded file temporarily
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        logger.info(f"File saved temporarily at: {file_path}")

        # Log file details
        logger.info(f"Processing file: {file.filename}")
        logger.info(f"File size: {os.path.getsize(file_path)} bytes")

        # Transcribe the audio
        logger.info("Starting transcription")
        result = model.transcribe(file_path)
        logger.info("Transcription completed")
        
        # Clean up
        os.remove(file_path)
        logger.info("Temporary file removed")

        return jsonify({
            'text': result['text'],
            'segments': result['segments']
        })

    except Exception as e:
        logger.error(f"Transcription error: {str(e)}", exc_info=True)
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
