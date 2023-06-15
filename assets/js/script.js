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

/*
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) { 
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "submit") {
                evaluateAnswer();
            } else if (this.getAttribute("id") === "start-button") {
                startTimer();
                } else if (this.getAttribute("id") === "reset-button") {
                    resetTimer();
                    } else {
                let difficulty = this.getAttribute("id");
                stageOne(difficulty);}
        })
    }
});
*/
let score = document.getElementById("current-score");
let counter = 60; 
let interval;

function timer() {
    clock.innerHTML = `${counter}s`;
    counter--;
    if (counter < 0 ) {
      clearInterval(interval);
      endGame();
    }
  }

function startTimer()  {
    startButton.setAttribute("disabled", true);
    interval = setInterval(timer, 1000);
    score.textContent = "0";

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

function easyDifficulty(){
    let num1 = Math.ceil(Math.random() * 5);
    let nOne = document.getElementById("n-1");
    nOne = Math.ceil(Math.random()*5);
    easyEquation(num1, nOne);
}

function normalDifficulty(){
    let num1 = Math.ceil(Math.random() * 12);
    let num2 = Math.ceil(Math.random() * 10);
    let nOne = document.getElementsByClassName("n-1");
    nOne = Math.ceil(Math.random()*12);
    normalEquation(num1, num2, nOne);
} /* 
    Temporarily Comment Out Hard Equation 

    else if (difficulty === "hard") {
    let num1 = Math.ceil(Math.random() * 20);
    let num2 = Math.ceil(Math.random()*5);
    let nOne = document.getElementsByClassName("n-1");
    nOne = Math.ceil(Math.random()*3);
    hardEquation(num1, num2, nOne);
}
*/

// Function to create equations for each difficulty

function easyEquation(num1, nOne) {
    document.getElementById("num1").textContent = num1+"n";
    document.getElementById("operator1").textContent = "";
    document.getElementById("num2").textContent = "";
    document.getElementById("operator2").textContent = "";
    document.getElementById("n-2").textContent = "";
    document.getElementById("operator3").textContent = "=";
    document.getElementById("sum").textContent = num1 * nOne;

}

function normalEquation(num1, nOne, num2) {
    let operatorArray = ['+', '-'];
    let operator = Math.floor(Math.random() * operatorArray.length);


    document.getElementById("num1").textContent = num1+"n";
    document.getElementById("operator1").textContent = operatorArray[operator];
    document.getElementById("num2").textContent = num2;
    document.getElementById("operator2").textContent = "";
    document.getElementById("n-2").textContent = "";
    document.getElementById("operator3").textContent = "=";
    if(operatorArray[operator] === "+") { 
        document.getElementById("sum").textContent = num1 * nOne + num2;
    } else {document.getElementById("sum").textContent = num1 * nOne - num2; 
}

};
/* Temporarily Comment Out Hard Equation 


function hardEquation(num1, num2, nOne) {
    let operatorArray = ['+', '-'];
    let operator = Math.floor(Math.random() * operatorArray.length);

    document.getElementById("num1").textContent = num1+"n";
    document.getElementById("operator1").textContent = operatorArray[operator];
    document.getElementById("num2").textContent = num2;
    document.getElementById("operator2").textContent = "^";
    document.getElementById("n-2").textContent = "n";
    document.getElementById("operator3").textContent = "=";
   if(operatorArray[operator] === "+") { 
        document.getElementById("sum").textContent = num1 * nOne + num2 ^ nOne;
    } else {document.getElementById("sum").textContent = (num1 * nOne) - (num2 ^ nOne); 
} 
}
*/

// Function to calculate the value of 'n'



function reDirect() {
    if (calculateAnswer[1] === "easy") {
        easyDifficulty();
    } else {
        normalDifficulty();
    }
}


function evaluateAnswer() {
    let userGuess = parseInt(document.getElementById("user-number").value);
    let correct = calculateAnswer();
    let userCorrect = userGuess === correct[0];

    if (userCorrect) {
        document.getElementById("answer-indicator").textContent = `
        Well Done! (insert tick icon here)`;
        reDirect();
        addScore();
    } else { document.getElementById("answer-indicator").textContent = `
    (insert cross icon here). Oh no, it was ${correct[0]}`;
    reDirect();
    }
}

function calculateAnswer() {
    let num1 = parseInt(document.getElementById("num1").textContent);
    let operator1 = document.getElementById("operator1").textContent;
    let num2 = parseInt(document.getElementById("num2").textContent);
    let sum = parseInt(document.getElementById("sum").textContent);
        if (operator1 === "+") {
           return [(sum - num2) / num1, "normal"]
        } else if (operator1 === "-") {
           return [(sum + num2) / num1, "normal"]
        } else {
            return [sum / num1, "easy"]
        }
    }


function addScore() {
    let currentScore = parseInt(score.textContent);
    if (calculateAnswer[1] === "easy") {
    score = currentScore + 1;
} else { score = currentScore +2;
}
}

function endGame() {
    
};