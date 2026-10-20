const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 12 × 8?",
        answers: ["86", "92", "96", "108"],
        correct: 2
    },
    {
        question: "Which language structures a webpage?",
        answers: ["HTML", "Python", "SQL", "C++"],
        correct: 0
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "How many sides does a hexagon have?",
        answers: ["Five", "Six", "Seven", "Eight"],
        correct: 1
    },
    {
        question: "Which gas do plants absorb?",
        answers: ["Oxygen", "Hydrogen", "Carbon dioxide", "Helium"],
        correct: 2
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Which animal is the fastest on land?",
        answers: ["Lion", "Horse", "Cheetah", "Leopard"],
        correct: 2
    },
    {
        question: "How many minutes are in one hour?",
        answers: ["30", "45", "60", "100"],
        correct: 2
    },
    {
        question: "Which device is used to move a cursor?",
        answers: ["Printer", "Mouse", "Speaker", "Monitor"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let answered = false;

const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const numberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const quizArea = document.getElementById("quiz-area");
const resultScreen = document.getElementById("result-screen");

function startGame() {
    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 0;
    timeLeft = 15;
    answered = false;

    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;

    quizArea.hidden = false;
    resultScreen.hidden = true;
    nextButton.hidden = true;

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);

    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    answered = false;
    timeLeft = 15;

    const item = questions[currentQuestion];

    questionElement.textContent = item.question;
    numberElement.textContent =
        `${currentQuestion + 1}/${questions.length}`;

    timerElement.textContent = timeLeft;
    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    feedbackElement.textContent = "";
    nextButton.hidden = true;
    answersElement.innerHTML = "";

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersElement.appendChild(button);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function selectAnswer(index) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const item = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (index === item.correct) {
        score += 10;
        scoreElement.textContent = score;

        feedbackElement.textContent = "🎉 Correct! +10 points";
        feedbackElement.style.color = "#4ade80";

        buttons[index].classList.add("correct");
    } else {
        feedbackElement.textContent = "❌ Not quite! Try the next one.";
        feedbackElement.style.color = "#f87171";

        buttons[index].classList.add("wrong");
        buttons[item.correct].classList.add("correct");
    }

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results 🏆"
            : "Next Question ➜";

    nextButton.hidden = false;
}

function timeUp() {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    buttons[item.correct].classList.add("correct");

    feedbackElement.textContent = "⏰ Time's up!";
    feedbackElement.style.color = "#fbbf24";

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results 🏆"
            : "Next Question ➜";

    nextButton.hidden = false;
}

function endGame() {
    clearInterval(timerInterval);

    quizArea.hidden = true;
    resultScreen.hidden = false;

    document.getElementById("final-score").textContent =
        `${score}/${questions.length * 10}`;

    let message;

    if (score >= 80) {
        message = "🌟 Excellent! You're a Brain Blitz champion!";
    } else if (score >= 50) {
        message = "👏 Great effort! Keep sharpening your brain!";
    } else {
        message = "💪 Keep practising. You can beat your score!";
    }

    document.getElementById("result-message").textContent = message;
    progressBar.style.width = "100%";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    showQuestion();
});

document.getElementById("restart-btn").addEventListener(
    "click",
    startGame
);

startGame();