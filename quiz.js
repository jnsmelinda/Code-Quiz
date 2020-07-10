document.getElementById("startQuiz").addEventListener("click", startTime);
const timeEl = document.getElementById("countDown");
var secondsLeft = 5;
var timerStarted = "true";


function startTime() {
  // TODO: check if timer has started and do nothing if so

  if (timerStarted === "true") {
    var timerInterval = setInterval(function () {

      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        timerStarted = "false";
      }

    }, 1000);
  }
}
