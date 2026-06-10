let questions = [];
let currentQ = 0;
let answers = [];
let quizTopic = '';
let quizDifficulty = 'medium';

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

async function generateQuiz() {
    const topic = document.getElementById('topic').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const num = parseInt(document.getElementById('num-questions').value);

    if (!topic) { alert('Please enter a topic!'); return; }

    quizTopic = topic;
    quizDifficulty = difficulty;
    await fetchQuiz(topic, difficulty, num);
}

async function generateMore() {
    await fetchQuiz(quizTopic, quizDifficulty, 5);
}

async function fetchQuiz(topic, difficulty, num) {
    showScreen('loading-screen');

    const texts = ['Analyzing topic with AI', 'Crafting questions...', 'Adding difficulty levels...', 'Almost ready!'];
    let i = 0;
    const fill = document.getElementById('progress-fill');
    const loadText = document.getElementById('loading-text');
    fill.style.width = '0%';
    const interval = setInterval(() => {
        i++;
        fill.style.width = (i * 25) + '%';
        loadText.textContent = texts[Math.min(i, texts.length - 1)];
        if (i >= 4) clearInterval(interval);
    }, 700);

    try {
        const res = await fetch('http://127.0.0.1:8000/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, difficulty, num_questions: num })
        });
        const data = await res.json();
        questions = data.questions;
        answers = new Array(questions.length).fill(null);
        currentQ = 0;
        clearInterval(interval);
        fill.style.width = '100%';
        setTimeout(() => startQuiz(), 400);
    } catch (err) {
        alert('Error generating quiz. Make sure backend is running.');
        showScreen('setup-screen');
    }
}

function startQuiz() {
    document.getElementById('quiz-topic').textContent = '📚 ' + quizTopic;
    buildDots();
    showScreen('quiz-screen');
    renderQuestion();
}

function buildDots() {
    const dots = document.getElementById('progress-dots');
    dots.innerHTML = questions.map((_, i) => `<div class="dot" id="dot-${i}"></div>`).join('');
}

function updateDots() {
    questions.forEach((_, i) => {
        const dot = document.getElementById('dot-' + i);
        dot.className = 'dot';
        if (answers[i] !== null) dot.classList.add('answered');
        if (i === currentQ) dot.classList.add('active');
    });
}

function renderQuestion() {
    const q = questions[currentQ];
    updateDots();
    document.getElementById('question-counter').textContent = `${currentQ + 1} / ${questions.length}`;
    document.getElementById('next-btn').textContent = currentQ === questions.length - 1 ? 'Submit ✓' : 'Next →';

    document.getElementById('question-container').innerHTML = `
        <div class="question-number">Question ${currentQ + 1}</div>
        <div class="question-text">${q.question}</div>
        <div class="options">
            ${q.options.map((opt, i) => `
                <div class="option ${answers[currentQ] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
                    ${opt}
                </div>
            `).join('')}
        </div>
    `;
}

function selectAnswer(idx) {
    answers[currentQ] = idx;
    renderQuestion();
}

function nextQuestion() {
    if (currentQ === questions.length - 1) { submitQuiz(); return; }
    currentQ++;
    renderQuestion();
}

function prevQuestion() {
    if (currentQ > 0) { currentQ--; renderQuestion(); }
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
        if (answers[i] !== null) {
            const selected = q.options[answers[i]].charAt(0);
            if (selected === q.correct) score++;
        }
    });

    const pct = Math.round((score / questions.length) * 100);
    document.getElementById('score-number').textContent = pct + '%';
    document.getElementById('score-text').textContent = pct >= 80 ? '🔥 Excellent!' : pct >= 60 ? '👍 Good Job!' : '💪 Keep Practicing!';
    document.getElementById('score-sub').textContent = `You got ${score} out of ${questions.length} correct`;

    const review = document.getElementById('review-container');
    review.innerHTML = questions.map((q, i) => {
        const userAns = answers[i] !== null ? q.options[answers[i]] : 'Not answered';
        const correct = q.options.find(o => o.charAt(0) === q.correct);
        const isCorrect = answers[i] !== null && q.options[answers[i]].charAt(0) === q.correct;
        return `
            <div class="review-item ${isCorrect ? 'correct-review' : 'wrong-review'}">
                <div class="review-q">${isCorrect ? '✅' : '❌'} ${q.question}</div>
                <div class="review-ans">Your answer: <span class="${isCorrect ? 'correct-ans' : 'wrong-ans'}">${userAns}</span></div>
                ${!isCorrect ? `<div class="review-ans">Correct: <span class="correct-ans">${correct}</span></div>` : ''}
                <div class="explanation">💡 ${q.explanation}</div>
            </div>
        `;
    }).join('');

    showScreen('result-screen');
}

function resetQuiz() {
    questions = []; answers = []; currentQ = 0;
    quizTopic = ''; quizDifficulty = 'medium';
    document.getElementById('topic').value = '';
    showScreen('setup-screen');
}