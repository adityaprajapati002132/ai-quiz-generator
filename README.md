# 🧠 AI Quiz Generator

> An intelligent quiz generation app powered by GPT-4o and GitHub Copilot

![Tech Stack](https://img.shields.io/badge/GPT--4o-GitHub%20Models-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCS%2FJS-purple)

---

## 🚀 What It Does

AI Quiz Generator creates intelligent multiple-choice quizzes on **any topic** instantly. Users can:

- Enter any topic (BGMI, Python, History, Science — anything)
- Choose difficulty level (Easy / Medium / Hard)
- Select number of questions (5 or 10)
- Get AI-generated questions with 4 options, correct answer, and explanation
- Review detailed results with score and explanations
- Generate more questions on the same topic instantly

---

## ✨ Features

- **AI-Powered Questions** — GPT-4o generates unique, contextual questions every time
- **Instant Quiz** — Results in under 10 seconds
- **Detailed Review** — Every question reviewed with correct answer + explanation
- **Generate More** — Get fresh questions on same topic without re-entering details
- **Modern UI** — Dark theme with animated gradients and smooth transitions
- **Any Topic** — No restrictions, works for education, gaming, trivia, professional skills

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, FastAPI |
| AI Model | GPT-4o via GitHub Models |
| API | Azure Inference API |

---

## 🤖 GitHub Copilot Usage

This project was built with **GitHub Copilot** as the primary development assistant:

- **FastAPI backend structure** — Copilot suggested the complete API endpoint structure including CORS middleware setup
- **Prompt engineering** — Copilot helped craft the JSON-structured prompt for consistent quiz generation
- **Regex parsing** — Copilot generated the JSON extraction logic from AI responses
- **CSS animations** — Copilot wrote the pulse ring animations, orb effects, and fadeUp transitions
- **Quiz flow logic** — Copilot assisted with the question navigation, dot progress tracker, and score calculation
- **Error handling** — Copilot suggested try/catch patterns for async fetch calls
- **`.gitignore` setup** — Copilot recommended security best practices for excluding `.env` files

---

## ⚙️ Setup & Run

### Prerequisites
- Python 3.10+
- GitHub Personal Access Token (for GitHub Models)

### Steps

```bash
# Clone the repo
git clone https://github.com/adityaprajapati002132/ai-quiz-generator.git
cd ai-quiz-generator

# Install dependencies
pip install fastapi uvicorn python-dotenv httpx

# Add your GitHub token
echo "GITHUB_TOKEN=your_token_here" > .env

# Run the backend
cd backend
uvicorn main:app --reload

# Open the app
# Visit: http://127.0.0.1:8000/static/index.html
```

---

## 📸 Screenshots

### Home Screen
Clean dark UI with topic input, difficulty selector, and animated background

### Quiz Screen  
Question cards with 4 options, progress dots, and smooth navigation

### Result Screen
Score circle, performance message, and detailed question review with explanations

---

## 🏆 Hackathon

Built for **Microsoft Agents League Hackathon** — Battle #1: Creative Apps with GitHub Copilot

**Track:** Creative Apps  
**Microsoft IQ Integration:** Foundry IQ (Azure AI inference layer via GitHub Models)

---

## 👤 Author

**Aditya Kumar**  
B.Tech IT — Rungta College of Engineering & Technology  
[GitHub](https://github.com/adityaprajapati002132)