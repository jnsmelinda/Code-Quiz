const questions = [
    {
        question: "123?",
        answers: [
            "a", "b", "c", "d"
        ],
        correctAnswer: 2
    },
    {
        question: "abc?",
        answers: [
            "1", "2", "3", "4"
        ],
        correctAnswer: 0
    }
]

document.getElementById("startQuiz").addEventListener("click", startGame);
const countDownElement = document.getElementById("countDown");
let secondsLeft = 10;
let started = false;
let timerInterval;
let score = 0;

function startGame() {
    if (started === false) {
        started = true;

        displayQuestion(0);

        timerInterval = setInterval(function () {
            if (secondsLeft > 0) {
                secondsLeft--;
                countDownElement.textContent = secondsLeft;
                if (secondsLeft <= 5) {
                    countDownElement.style.color = "red";
                }
            }
            else {
                gameOver();
            }
        }, 1000);
    }
}

function displayQuestion(questionIndex) {
    const question = document.getElementById("question");
    question.textContent = questions[questionIndex].question;

    for (let i = 0; i < 4; i++) {
        const answer = document.getElementById(`answer-${i}`);
        answer.textContent = questions[questionIndex].answers[i];
        answer.onclick = () => markAnswer(questionIndex, i);
    }
}

function markAnswer(questionIndex, answerIndex) {
    alert(questions[questionIndex].correctAnswer === answerIndex ? "correct" : "incorrect");
    questionIndex++;
    if (questionIndex === questions.length) {
        gameOver();
    }
    else {
        displayQuestion(questionIndex);
    }
}

function gameOver() {
    clearInterval(timerInterval);
}
