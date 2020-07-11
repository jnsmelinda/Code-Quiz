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
let secondsLeft = 10;
let started = false;
let timerInterval;
let score = 0;

function startGame() {
    if (started === false) {
        started = true;

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
    let resultOfPrevQuestion = document.getElementById("result");
    // alert(challenges[challengeIndex].correctAnswer === answerIndex ? "correct" : "incorrect");

    if (challenges[challengeIndex].correctAnswer === answerIndex) {
        resultOfPrevQuestion.textContent = "Correct";
        score++;
    }
    else {
        resultOfPrevQuestion.textContent = "Incorrect";
        secondsLeft -= 3;
    }

    challengeIndex++;
    document.getElementById("question").textContent = "";
    document.getElementById("buttons").innerHTML = "";
    if (challengeIndex === challenges.length) {
        gameOver();
    }
    else {
        displayChallenge(challengeIndex);
    }
}

function gameOver() {
    document.getElementById("question").textContent = "Score: " + score;
    clearInterval(timerInterval);
    
}
