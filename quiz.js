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

document.getElementById("startQuiz").addEventListener("click", startTime);
const timeEl = document.getElementById("countDown");
let body = document.body;
let secondsLeft = 10;
let timerStarted = false;


function startTime() {
  if (timerStarted === false) {
    timerStarted = true;

    displayQuestion(0);

    let timerInterval = setInterval(function () {
      

      if (secondsLeft <= 5) {
        timeEl.style.color = "red";
      }
      if (secondsLeft >= 0) {
        timeEl.textContent = secondsLeft;
        secondsLeft--;
      }
      else {
        clearInterval(timerInterval);
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
  displayQuestion(questionIndex + 1);
}
