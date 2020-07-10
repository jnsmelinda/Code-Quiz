document.getElementById("startQuiz").addEventListener("click", startTime);
const timeEl = document.getElementById("countDown");
var secondsLeft = 5;

function startTime() {

  // TODO: check if timer has started and do nothing if so
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "";
    }

  }, 1000);
}
