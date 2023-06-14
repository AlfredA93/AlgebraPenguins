// Add JavaScript here

//Wait for the DOM to load fully before the game can start running.
//Add event listeners for which difficulty is chosen.


document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) { 
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "submit") {
                evaluateAnswer();
            } else {
                let difficulty = this.getAttribute("id");
                stageOne(difficulty);
            }
        })
    }
});

/** If statement for difficulty selector.
 * These change between 3 difficulties.
 * Examples are as follows:
 * Easy -> 3n = 15
 * Normal -> 4n + 4 = 8
 * Hard -> 14n - 4^n = 10
*/ 

function stageOne(difficulty){
if (difficulty === "easy") {
    let num1 = Math.ceil(Math.random() * 5);
    let nOne = document.getElementById("n-1");
    nOne = Math.ceil(Math.random()*5);
    easyEquation(num1, nOne);
} else if (difficulty === "normal") {
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
} */ else {
    alert(`Please select difficulty.`);
    throw `Please select difficulty. Aborting.`;
}
}

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

function calculateAnswer() {
    let num1 = document.getElementById("num1").value;
    let operator1 = document.getElementById("operator1").textContent;
    let num2 = document.getElementById("num2").value;
    let sum = document.getElementById("sum").value;
        if (operator1 === "+") {
            (sum - num2) / num1
        } else if (operator1 === "-") {
            (sum + num2) / num1
        } else {num1 / sum}
    }




// Function to check the user answer

// Function to check current score and add 1 if the user answer is correct  