// Add JavaScript here

// Function for Start/Stop Timer Buttons which then trigger the function to run the game.

// If statement for difficulty selector
if (difficulty === "easy") {
    let num1 = Math.ceil(Math.random() * 5);
    easyEquation(num1);
} else if (difficulty === "normal") {
    let num1 = Math.ceil(Math.random() * 10);
    let num2 = Math.ceil(Math.random() * 10);
    normalEquation(num1, num2);
} else if (difficulty === "hard") {
    let num1 = Math.ceil(Math.random() * 20);
    let num2 = Math.ceil(Math.random()*4);
    hardEquation(num1, num2);
} else {
    alert(`Please select difficulty.`);
    throw `Please select difficulty. Aborting.`;
}

// Function to create equations for each difficulty

// Function to calculate the value of 'n'

// Function to check the user answer

// Function to check current score and add 1 if the user answer is correct
