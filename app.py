from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import google.generativeai as genai
from google.cloud import speech_v1p1beta1 as speech
import os

# Set up FastAPI app
app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def serve_frontend():
    with open("G:/DevOps_Hackathon/online_shop/build/index.html") as f:
        return HTMLResponse(f.read())

# Set up your Gemini API key.
genai.configure(api_key="AIzaSyA3joMQMnael_heUCwpNvoRznCUiU3avf4")

# Create the model with the desired configuration.
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

# Function to generate a response from Gemini API.
def chat_with_gemini(user_query):
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(user_query)
    return response.text.strip()

# Function to generate a response from Gemini API.
def chat_with_gemini(user_query):
    if user_query.lower() in ["who are you?", "who are you"]:
        return "I am Online Shop, your virtual assistant!"
    
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(user_query)
    return response.text.strip()


@app.post("/chat")
async def chat(user_query: str = Form(...)):
    response = chat_with_gemini(user_query)
    return {"response": response}
# Function to transcribe audio file with auto punctuation
def transcribe_file_with_auto_punctuation(audio_content: bytes) -> speech.RecognizeResponse:
    client = speech.SpeechClient()
    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
        enable_automatic_punctuation=True,
    )
    response = client.recognize(config=config, audio=audio)
    return response

# API endpoint for speech-to-text conversion
@app.post("/speech-to-text/")
async def speech_to_text(file: UploadFile = File(...)):
    client = speech.SpeechClient()
    content = await file.read()
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
        enable_word_confidence=True,
    )
    response = client.recognize(config=config, audio=audio)
    results = []
    for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        results.append({
            "result_index": i,
            "transcript": alternative.transcript,
            "first_word": alternative.words[0].word if alternative.words else None,
            "confidence": alternative.words[0].confidence if alternative.words else None
        })
    
    # Integrate the new function
    auto_punctuation_response = transcribe_file_with_auto_punctuation(content)
    auto_punctuation_results = []
    for i, result in enumerate(auto_punctuation_response.results):
        alternative = result.alternatives[0]
        auto_punctuation_results.append({
            "result_index": i,
            "transcript": alternative.transcript,
        })

    return {"results": results, "auto_punctuation_results": auto_punctuation_results}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)