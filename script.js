// Stores the current number shown on the calculator
let currentInput = "0";

// Stores the previous number before an operator is selected
let previousInput = "";

// Stores the selected mathematical operator
let operator = "";

// Gets the display and message elements
const display = document.getElementById("display");
const message = document.getElementById("message");


// Function to enter a number
function inputNumber(number) {
    // If an error is displayed, we start a new calculation
    if (currentInput === "Error") {
        currentInput = "0";
    }

    // Replace the initial zero with the entered number
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    message.textContent = "";
    updateDisplay();
}


// Function to enter a decimal point
function inputDecimal() {
    // allows only one decimal point
    if (currentInput.includes(".")) {
        return;
    }

    currentInput += ".";
    updateDisplay();
}


// Function to select a mathematical operator
function chooseOperator(selectedOperator) {
    // Do not allow an operator when the display shows an error
    if (currentInput === "Error") {
        return;
    }

    // Store the current number
    previousInput = currentInput;

    // Store the selected operator
    operator = selectedOperator;

    // Clear the current input for the next number
    currentInput = "0";

    message.textContent = "";
}


// Function to perform the calculation
function calculate() {
    //To make sure operator and previous number exist
    if (operator === "" || previousInput === "") {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    // Handle division and modulo by zero(gracefully handling the invalid inputs)
    if ((operator === "/" || operator === "%") && secondNumber === 0) {
        currentInput = "Error";
        display.value = currentInput;

        // Showing short error message
        message.textContent = "Invalid operation";

        previousInput = "";
        operator = "";

        return;
    }

    // to perform the selected operation
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    // to prevent Infinity and NaN from appearing on the calculator
    if (!Number.isFinite(result)) {
        currentInput = "Error";
        message.textContent = "Invalid operation";
    } else {
        currentInput = String(result);
        message.textContent = "";
    }

    previousInput = "";
    operator = "";

    updateDisplay();
}


// Function to clear the calculator
function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = "";

    message.textContent = "";

    updateDisplay();
}


// Function to delete the last entered digit
function deleteLast() {
    // If the display shows an error, reset it
    if (currentInput === "Error") {
        clearDisplay();
        return;
    }

    // Remove the last character
    currentInput = currentInput.slice(0, -1);

    // If nothing remains, show zero
    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }

    updateDisplay();
}


// Function to update the calculator display
function updateDisplay() {
    display.value = currentInput;
}