const challenges = [
    {
        question: "Inside which HTML element do you put the JavaScript file?",
        answers: [
            "<script>", "<javascript>", "<scripting>", "<js>"
        ],
        correctAnswer: 0
    },
    {
        question: "Where is the correct place to insert the JavaScript file?",
        answers: [
            "The <head> section", "The <body> section", "Both the <head> section and <body> section are correct"
        ],
        correctAnswer: 2
    },
    {
        question: "How can you detect the application name of the client’s browser?",
        answers: [
            "navigator.appName", "navigator.browserName", "browser.appName", "browser.name"
        ],
        correctAnswer: 0
    },
    {
        question: "Which one of the following is correct?",
        answers: [
            "i =+ 1", "i = i++1;", "+i+;", "i += 1;"
        ],
        correctAnswer: 3
    },
    {
        question: "Which array method sorts the elements of an array?",
        answers: [
            "sort()", "changeOrder(order)", "order()", "None of the others"
        ],
        correctAnswer: 0
    },
    {
        question: "How do you open a new window with JavaScript?",
        answers: [
            "window.new(...);", "open(new window());", "window.open(...);", "indow.open_new(...);"
        ],
        correctAnswer: 2
    },
    {
        question: "Which of the following event occurs when the user clicks on an HTML element?",
        answers: [
            "onchange", "onclick", "onmouseover", "onmouseclick"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you get the DOM element by id in JavaScript?",
        answers: [
            "window.getElementById(...)", "document.getElementById(...)", "page.getElementById(...)", "document.innerHTML.getElementById(...)"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you create a new function in JavaScript?",
        answers: [
            "function = myFunction() {}", "function:myFunction() {}", "new.function() {}", "function myFunction() {}"
        ],
        correctAnswer: 3
    },
    {
        question: "Can you set the style of an HTML tag by using JavaScript?",
        answers: [
            "yes","no"
        ],
        correctAnswer: 0
    },

]

let secondsLeft = 120;
let started = false;
let timerInterval;
let score = 0;
let highScoreList = JSON.parse(localStorage.getItem("highScore")) || [];

document.getElementById("startQuiz").addEventListener("click", startGame);
const countDownElement = document.getElementById("countDown");
countDownElement.textContent = getFormattedTime(secondsLeft);
const userInput = document.getElementById("userInput");
hideElement(userInput);
document.getElementById("inputForm").addEventListener("submit", saveHighScore);
const saveButton = document.getElementById("saveButton").addEventListener("click", saveHighScore);
const highScoreTable = document.getElementById("highScoreTable");
hideElement(highScoreTable);
document.getElementById("toggleScores").addEventListener("click", toggleHighScoreTable);
document.getElementById("clearScores").addEventListener("click", clearHighScores);

function startGame() {
    if (started === false) {
        started = true;
        hideHighScoreTable();
        document.getElementById("startQuiz").remove();

        displayChallenge(0);

        timerInterval = setInterval(function () {
            if (secondsLeft > 0) {
                secondsLeft--;
                countDownElement.textContent = getFormattedTime(secondsLeft);
                if (secondsLeft <= 10) {
                    countDownElement.style.color = "red";
                }
            }
            else {
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
    }
    else {
        return number;
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
        secondsLeft -= 10;
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
