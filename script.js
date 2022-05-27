const input = document.querySelector(".input");
const btns = Array.from(document.querySelectorAll("button"));
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a , b);
}

function updateDisplay(number) {
    let display = input.textContent;
    if (number !== "." && display === "0") clearDisplay();
    if (number === "." && display.includes("."))  number = "";

    input.textContent += number;
}

function clearDisplay(number) {
    (number !== undefined) ? number : number = ""
    input.textContent = `${number}`;
}

function removeDigit() {
    let digits = input.textContent;
    (digits.length > 1) ? digits = digits.slice(0, -1) : digits = "0";
    input.textContent = digits;
}

function saveOperator(e) {
    const opClassTypes = ["btnMult", "btnDiv", "btnMin", "btnPlus"];
    const operationClass = (Array.from(e.target.classList))
        .filter(element => opClassTypes.includes(element)).toString();
        
    switch (operationClass) {
    case "btnMult":
        return multiply;
    case "btnDiv":
        return divide;
    case "btnMin":
        return subtract;
    case "btnPlus":
        return add;
    default:
        break;
}
}
let operator;
let operand1;
let operand2;
let canClearDisplay = false;
let operatorSelected = false;
function saveState(e) {
    if (!operatorSelected && !operand1) {
        operand1 = parseInt(input.textContent);
        operatorSelected = true;
        console.log(operand1);
    } else if (!operatorSelected && !operand2) {
        operand2 = parseInt(input.textContent);
        clearDisplay();
        updateDisplay(operate(operator, operand1, operand2));
        operand1 = parseInt(input.textContent);
        operand2 = null;
        operatorSelected = true;
    }
    operator = saveOperator(e);

    console.log(operator);
}

btns.forEach( button => button.addEventListener("click", (e) => {
    const btnClasses = e.target.classList;
    // clear display
    if (btnClasses.contains("btnC")) clearDisplay(0);
    // backspace
    if (btnClasses.contains("btnB")) removeDigit();
    // add number to display
    if (btnClasses.contains("btnr2") && operatorSelected) {
        clearDisplay(); 
        operatorSelected = false;
    }
    if (btnClasses.contains("btnr2")) updateDisplay(e.target.textContent);
    
    // console.log(Array.from(e.target.classList));
    if (btnClasses.contains("op")) saveState(e);
}));
