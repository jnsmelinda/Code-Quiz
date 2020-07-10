document.getElementById("startQuiz").addEventListener("click", startTime);
const timeEl = document.getElementById("countDown");
var secondsLeft = 5;
var timerStarted = "true";


function startTime() {
  if (timerStarted === "true") {
    var timerInterval = setInterval(function () {
      timeEl.textContent = secondsLeft + " seconds left.";

      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        timerStarted = "false";
      }
      secondsLeft--;
    }, 1000);
  }
}
