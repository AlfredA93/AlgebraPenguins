/*When DOM has loaded, load all javascript functions */

document.addEventListener("DOMContentLoaded", function () {

/* Button constants */

  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const submitButton = document.getElementById("submit");
  const easyButton = document.getElementById("easy");
  const normalButton = document.getElementById("normal");

/* Clock constant for start/reset timer functions */

  const clock = document.getElementById("clock");

/* Equation variables - for each part of the game's features*/

  const numOneText = document.getElementById("num1")
  const operatorOneText = document.getElementById("operator1")
  const numTwoText = document.getElementById("num2")
  const operatorThreeText = document.getElementById("operator3")
  const sumText = document.getElementById("sum")
  const score = document.getElementById("current-score");
  const userNumber = document.getElementById("user-number");

  /**
   * Event Listeners to hear for clicks and keypress Enter
   * Chooses difficulty, starts or resets timer
  */

  startButton.addEventListener("click", startTimer);
  resetButton.addEventListener("click", resetTimer);
  submitButton.addEventListener("click", evaluateAnswer);
  easyButton.addEventListener("click", easyDifficulty);
  normalButton.addEventListener("click", normalDifficulty);
  userNumber.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
      if (counter > 0) {
        evaluateAnswer();
      } else {
        alert(`Please reset game to continue playing`)
      }
    }
    })  

/* Variables counter and interval are global, so they can be used by the timer function */

  let counter = 60;
  let interval;

  /* Focal point function puts the focus of the page on the user input */ 

  function focalPoint() {
    document.getElementById("user-number").focus();
    document.getElementById("user-number").value = "";
  }

  /**
   * disableButtons function disables all buttons apart from start button
   * enable Buttons removes the disabled attribute from the buttons, so these can be accessed  */ 

  function disableButtons() {
    resetButton.setAttribute("disabled", true);
    easyButton.setAttribute("disabled", true);
    normalButton.setAttribute("disabled", true);
    submitButton.setAttribute("disabled", true);
    userNumber.setAttribute("disabled", true);
  }

  function enableButtons() {
    resetButton.removeAttribute("disabled");
    easyButton.removeAttribute("disabled");
    normalButton.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    userNumber.removeAttribute("disabled");
  }

  /** This disables all buttons apart from the Start button when the page loads */ 

  disableButtons();

  /**
   * Timer function runs a timer from 60s to 0 and then triggers
   * endGame function when timer reaches 0 
   */ 

  function timer() {
    clock.innerHTML = `${counter}s`;
    counter--;
    if (counter < 0) {
      clearInterval(interval);
      endGame();
    }
  }

   /**
   * startTimer triggers the timer to start and enables the difficulty and submit buttons
   * It also used setTimeout() function so that both the equation and the timer 
   * show on screen at the same time.
   */ 

  function startTimer() {
    startButton.setAttribute("disabled", true);
    interval = setInterval(timer, 1000);
    score.textContent = "0";
    enableButtons();
    setTimeout(normalDifficulty, 1000);
  }

  /**
   * resetTimer resets the timer and score and triggers reset equation styles function, so the page returns
   * back to the state of initial page load.
   */ 

  function resetTimer() {
    clearInterval(interval);
    counter = 60;
    clock.innerHTML = ``;
    startButton.removeAttribute("disabled");
    score.textContent = "0";
    equationStylesReset();
  }

  /**
   * equationStyles function gives the equation styles, 
   * so that they appear in a box with similar styles to the buttons
   */ 

  function equationStyles() {
    let equationBorder = document.querySelector('.equation-border');
    equationBorder.style.cssText = 'background-color: white; display:flex; justify-content: center; align-items: center; border-radius: 5px; padding: 0 2.5% 0 2.5%; border: solid 2px'
  }

  /**
   * equationStylesReset function clears all equation styles, so the page returns
   * back to the state of initial page load. 
   */ 

  function equationStylesReset() {
    let equationBorder = document.querySelector('.equation-border');
    equationBorder.style.cssText = '';
    numOneText.textContent = ""
    operatorOneText.textContent = ""
    numTwoText.textContent = ""
    operatorThreeText.textContent = "";
    sumText.textContent = "";
    disableButtons();
  }

  /** 
   * Difficulty Selector functions.
   * Examples are as follows:
   * Easy -> 3n = 15
   * Normal -> 4n + 4 = 8
   */

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

  /**
   * easyEquation and normalEquation functions display the equation.
   * These functions use the random numbers generated in the difficulty 
   * functions and set's their position in the html.
   */ 

  function easyEquation(num1, nOne) {
    numOneText.textContent = num1 + "n";
    operatorOneText.textContent = "";
    numTwoText.textContent = "";
    operatorThreeText.textContent = "=";
    sumText.textContent = num1 * nOne;
  }

  function normalEquation(num1, nOne, num2) {
    let operatorArray = ["+", "-"];
    let operator = Math.floor(Math.random() * operatorArray.length);

    numOneText.textContent = num1 + "n";
    operatorOneText.textContent = operatorArray[operator];
    numTwoText.textContent = num2;
    operatorThreeText.textContent = "=";
    if (operatorArray[operator] === "+") {
      sumText.textContent = num1 * nOne + num2;
    } else {
      sumText.textContent = num1 * nOne - num2;
    }
  }

  /**
   * reDirect Function launches the next equation to run depending on current difficulty level.
   * This function also clears the text of the answer indicator section. 
   * The answer indicator shows whether their previous guess was correct or not.
   */  

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

  /**
   * evaluateAnswer function checks the user answer with the calculated answer.
   * If user is correct, it triggers the score function to add points to the score.
   */

  function evaluateAnswer() {
    let userGuess = parseInt(userNumber.value);
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

  /**
   * calculateAnswer function generates the correct answer from the html on the page
   * It converts the string into numbers and runs the equation to calculate the value of 'n'
   * It creates an array which then can be accessed by both reDirect function and addScore function.
   */

  function calculateAnswer() {
    let num1 = parseInt(numOneText.textContent);
    let operator1 = operatorOneText.textContent;
    let num2 = parseInt(numTwoText.textContent);
    let sum = parseInt(sumText.textContent);
    if (operator1 === "+") {
      return [(sum - num2) / num1, "normal"];
    } else if (operator1 === "-") {
      return [(sum + num2) / num1, "normal"];
    } else {
      return [sum / num1, "easy"];
    }
  }

  /* addScore function adds points to the score depending on the difficulty level */ 

  function addScore() {
    let currentScore = parseInt(score.textContent);
    if (calculateAnswer()[1] === "easy") {
      score.textContent = currentScore + 1;
    } else {
      score.textContent = currentScore + 2;
    }
  }

  /**
   * endGame function triggers when the timer reaches 0
   * It disables all buttons apart from reset.
   * It triggers an alert to tell the user their score and gives 
   * them an appropriate message depending on their score.  
   */ 

  function endGame() {
    easyButton.setAttribute("disabled", true);
    normalButton.setAttribute("disabled", true);
    submitButton.setAttribute("disabled", true);
    startButton.setAttribute("disabled", true);
    if (score.textContent == "0") {
      alert(`Oh no, you scored ${score.textContent}. Have another go by clicking the reset button. You can do it! Us penguins believe in you!`)
    } else alert(`Well done! You scored ${score.textContent}! Can you or your friends beat this? Have another go by clicking the reset button`)
  }
});
