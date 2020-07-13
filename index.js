let secondsLeft = 120;
let started = false;
let timerInterval;
let score = 0;
let highScoreList = JSON.parse(localStorage.getItem("highScore")) || [];
shuffle(challenges);

document.getElementById("startQuiz").addEventListener("click", startGame);
document.getElementById("toggleScores").addEventListener("click", toggleHighScoreTable);
document.getElementById("clearScores").addEventListener("click", clearHighScores);
document.getElementById("inputForm").addEventListener("submit", saveHighScore);
document.getElementById("saveButton").addEventListener("click", saveHighScore);
document.getElementById("restart").addEventListener("click", restart);

const countDownElement = document.getElementById("countDown");
countDownElement.textContent = getFormattedTime(secondsLeft);
const userInput = document.getElementById("userInput");
const highScoreTable = document.getElementById("highScoreTable");

function startGame() {
    if (started === false) {
        started = true;
        hideHighScoreTable();
        document.getElementById("startQuiz").remove();

        displayChallenge();

        timerInterval = setInterval(function() {
            if (secondsLeft > 0) {
                secondsLeft--;
                countDownElement.textContent = getFormattedTime(secondsLeft);
                if (secondsLeft <= 10) {
                    countDownElement.style.color = "red";
                }
            } else {
                gameOver();
            }
        }, 1000);
    }
}

function getFormattedTime(seconds) {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return getFormattedNumber(minutesLeft) + ":" + getFormattedNumber(secondsLeft);
}

function getFormattedNumber(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}

function displayChallenge(challengeIndex = 0) {
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
    } else {
        resultOfPrevQuestion.textContent = "Previous: Incorrect";
        secondsLeft -= 10;
    }

    resetChallenge();
    if (challengeIndex === challenges.length - 1) {
        gameOver();
    } else {
        displayChallenge(challengeIndex + 1);
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
        };

        highScoreList.push(highScoreItem);
        highScoreList.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScore", JSON.stringify(highScoreList));

        hideElement(userInput);

        renderHighScores();
        showBlockElement(highScoreTable);
    }
}

function renderHighScores() {
    const highScoresElement = document.getElementById("highScores");
    highScoresElement.innerHTML = "";

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
    } else {
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function restart() {
    window.location.reload();
}
