from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../frontend"), name="static")

class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    num_questions: int = 5

@app.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    token = os.getenv("GITHUB_TOKEN")
    
    prompt = f"""Generate {request.num_questions} multiple choice questions about "{request.topic}" at {request.difficulty} difficulty level.

Return ONLY a JSON array in this exact format:
[
  {{
    "question": "question text here",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "correct": "A",
    "explanation": "brief explanation"
  }}
]"""

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://models.inference.ai.azure.com/chat/completions",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "model": "gpt-4o",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            },
            timeout=30
        )
    
    data = response.json()
    content = data["choices"][0]["message"]["content"]
    
    import json, re
    match = re.search(r'\[.*\]', content, re.DOTALL)
    questions = json.loads(match.group())
    
    return {"questions": questions, "topic": request.topic}

@app.get("/")
def root():
    return {"status": "AI Quiz Generator running"}