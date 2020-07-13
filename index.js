const challenges = [
    {
        question: "123?",
        answers: [
            "a", "b", "c", "d", "e"
        ],
        correctAnswer: 2
    },
    {
        question: "abc?",
        answers: [
            "1", "2", "3", "4"
        ],
        correctAnswer: 0
    },
    {
        question: "hgf?",
        answers: [
            "#", "@", "!", "%"
        ],
        correctAnswer: 0
    }
]

document.getElementById("startQuiz").addEventListener("click", startGame);
const countDownElement = document.getElementById("countDown");
const userInput = document.getElementById("userInput");
hideElement(userInput);
document.getElementById("inputForm").addEventListener("submit", saveHighScore);
const saveButton = document.getElementById("saveButton").addEventListener("click", saveHighScore);
const highScoreTable = document.getElementById("highScoreTable");
hideElement(highScoreTable);
document.getElementById("toggleScores").addEventListener("click", toggleHighScoreTable);
document.getElementById("clearScores").addEventListener("click", clearHighScores);

let secondsLeft = 10;
let started = false;
let timerInterval;
let score = 0;

let highScoreList = JSON.parse(localStorage.getItem("highScore")) || [];

function startGame() {
    if (started === false) {
        started = true;
        hideHighScoreTable();
        document.getElementById("startQuiz").remove();

        displayChallenge(0);

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

function displayChallenge(challengeIndex) {
    const challenge = challenges[challengeIndex];
    document.getElementById("question").textContent = challenge.question;

    for (let i = 0; i < challenge.answers.length; i++) {
        const button = document.createElement("button");
        button.id = "answer-" + i;
        button.classList = "btn btn-primary btn-sm";
        button.textContent = challenge.answers[i];
        button.onclick = () => markAnswer(challengeIndex, i);
        document.getElementById("buttons").appendChild(button);
    }
}

function markAnswer(challengeIndex, answerIndex) {
    const resultOfPrevQuestion = document.getElementById("result");
    if (challenges[challengeIndex].correctAnswer === answerIndex) {
        resultOfPrevQuestion.textContent = "Previous: Correct";
        score++;
    }
    else {
        resultOfPrevQuestion.textContent = "Previous: Incorrect";
        secondsLeft -= 3;
    }

    challengeIndex++;
    resetChallenge();
    if (challengeIndex === challenges.length) {
        gameOver();
    }
    else {
        displayChallenge(challengeIndex);
    }
}

function gameOver() {
    clearInterval(timerInterval);
    countDownElement.textContent = "0";
    resetChallenge();
    displayScore();
    showBlockElement(userInput);
}

function displayScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

function resetChallenge() {
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("question").innerHTML = "";
}

function saveHighScore(event) {
    event.preventDefault();
    const username = document.getElementById("playerName").value.trim();

    if (username !== "") {
        const highScoreItem = {
            name: username,
            score: score
        }

        highScoreList.push(highScoreItem);
        localStorage.setItem("highScore", JSON.stringify(highScoreList));

        hideElement(userInput);

        renderHighScores();
        showBlockElement(highScoreTable);
    }
}

function renderHighScores() {
    const highScoresElement = document.getElementById("highScores");
    highScoresElement.innerHTML = "";

    highScoreList.sort((a, b) => b.score - a.score);
    for (let i = 0; i < highScoreList.length; i++) {
        const scoreTableRow = highScoreList[i];

        const row = document.createElement("li");
        row.textContent = scoreTableRow.name + " " + scoreTableRow.score;
        row.setAttribute("data-index", i);

        highScoresElement.appendChild(row);
    }
}

function toggleHighScoreTable() {
    if (highScoreTable.style.display === "none") {
        showHighScoreTable();
    }
    else {
        hideHighScoreTable();
    }
}

function showHighScoreTable() {
    renderHighScores();
    showBlockElement(highScoreTable);
}

function hideHighScoreTable() {
    hideElement(highScoreTable);
}

function clearHighScores() {
    highScoreList = [];
    localStorage.clear();
    renderHighScores();
}

function showBlockElement(element) {
    element.style.display = "block";
}

function hideElement(element) {
    element.style.display = "none";
}
