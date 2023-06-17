document.addEventListener("DOMContentLoaded", function () {
  // Add JavaScript here

  //Wait for the DOM to load fully before the game can start running.
  //Add event listeners for which difficulty is chosen.

  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const submitButton = document.getElementById("submit");
  const easyButton = document.getElementById("easy");
  const normalButton = document.getElementById("normal");

  const clock = document.getElementById("clock");

  startButton.addEventListener("click", startTimer);
  resetButton.addEventListener("click", resetTimer);
  submitButton.addEventListener("click", evaluateAnswer);
  easyButton.addEventListener("click", easyDifficulty);
  normalButton.addEventListener("click", normalDifficulty);

  let score = document.getElementById("current-score");
  let counter = 60;
  let interval;

  function focalPoint() {
    document.getElementById("user-number").focus();
    document.getElementById("user-number").value = "";
  }

  function disableButtons() {
    resetButton.setAttribute("disabled", true);
    easyButton.setAttribute("disabled", true);
    normalButton.setAttribute("disabled", true);
    submitButton.setAttribute("disabled", true);
  }

  function enableButtons() {
    resetButton.removeAttribute("disabled");
    easyButton.removeAttribute("disabled");
    normalButton.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
  }

  disableButtons();

  function timer() {
    clock.innerHTML = `${counter}s`;
    counter--;
    if (counter < 0) {
      clearInterval(interval);
      endGame();
    }
  }

  function startTimer() {
    startButton.setAttribute("disabled", true);
    interval = setInterval(timer, 1000);
    score.textContent = "0";
    enableButtons();
  }

  function resetTimer() {
    clearInterval(interval);
    counter = 60;
    clock.innerHTML = ``;
    startButton.removeAttribute("disabled");
    score.textContent = "0";
  }

  /** If statement for difficulty selector.
   * These change between 3 difficulties.
   * Examples are as follows:
   * Easy -> 3n = 15
   * Normal -> 4n + 4 = 8
   * Hard -> 14n - 4^n = 10
   */

  function equationStyles() {
    let equationBorder = document.querySelector('.equation-border');
    equationBorder.style.cssText = 'background-color: white; display:flex; justify-content: center; align-items: center; border-radius: 5px; padding: 0 2.5% 0 2.5%; border: solid 2px'
  }

  function easyDifficulty() {
    let num1 = Math.ceil(Math.random() * 5);
    let nOne = document.getElementById("n-1");
    nOne = Math.ceil(Math.random() * 5);
    easyEquation(num1, nOne);
    focalPoint();
    equationStyles()
  }

  function normalDifficulty() {
    let num1 = Math.ceil(Math.random() * 12);
    let num2 = Math.ceil(Math.random() * 10);
    let nOne = document.getElementById("n-1");
    nOne = Math.ceil(Math.random() * 12);
    normalEquation(num1, num2, nOne);
    focalPoint();
    equationStyles();
  }

  // Function to create equations for each difficulty

  function easyEquation(num1, nOne) {
    document.getElementById("num1").textContent = num1 + "n";
    document.getElementById("operator1").textContent = "";
    document.getElementById("num2").textContent = "";
    document.getElementById("operator3").textContent = "=";
    document.getElementById("sum").textContent = num1 * nOne;
  }

  function normalEquation(num1, nOne, num2) {
    let operatorArray = ["+", "-"];
    let operator = Math.floor(Math.random() * operatorArray.length);

    document.getElementById("num1").textContent = num1 + "n";
    document.getElementById("operator1").textContent = operatorArray[operator];
    document.getElementById("num2").textContent = num2;
    document.getElementById("operator3").textContent = "=";
    if (operatorArray[operator] === "+") {
      document.getElementById("sum").textContent = num1 * nOne + num2;
    } else {
      document.getElementById("sum").textContent = num1 * nOne - num2;
    }
  }

  // Function to calculate the value of 'n'

  function reDirect() {
    if (calculateAnswer()[1] === "easy") {
      easyDifficulty();
    } else {
      normalDifficulty();
    }
    setTimeout(function(){
        document.getElementById("answer-indicator").textContent = "";
    }, 2000);
  }

  function evaluateAnswer() {
    let userGuess = parseInt(document.getElementById("user-number").value);
    let correct = calculateAnswer();
    let userCorrect = userGuess === correct[0];

    if (userCorrect) {
      document.getElementById("answer-indicator").innerHTML = `
      <i class="fa-solid fa-check" style="color: #00d60e;"></i>   Well Done!`;
      reDirect();
      addScore(calculateAnswer[1]);
    } else {
      document.getElementById("answer-indicator").innerHTML = `
      <i class="fa-solid fa-xmark" style="color: #db0000;"></i> Oh no, it was ${correct[0]}`;
      reDirect();
    }
  }

  function calculateAnswer() {
    let num1 = parseInt(document.getElementById("num1").textContent);
    let operator1 = document.getElementById("operator1").textContent;
    let num2 = parseInt(document.getElementById("num2").textContent);
    let sum = parseInt(document.getElementById("sum").textContent);
    if (operator1 === "+") {
      return [(sum - num2) / num1, "normal"];
    } else if (operator1 === "-") {
      return [(sum + num2) / num1, "normal"];
    } else {
      return [sum / num1, "easy"];
    }
  }

  function addScore() {
    let currentScore = parseInt(score.textContent);
    if (calculateAnswer()[1] === "easy") {
      score.textContent = currentScore + 1;
    } else {
      score.textContent = currentScore + 2;
    }
  }

  function endGame() {}
});
