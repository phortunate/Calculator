const input = document.querySelector(".input");
const btns = Array.from(document.querySelectorAll("button"));
let operand1;
let operand2;
let operator;
let operatorSelected = false;
let isEquals = false;

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
    return (b ===0) ? "LOL" : a / b;
}

function operate(operator, a, b) {
    const result =  (operator(a , b)).toString();
    return (result.length > 13) ? result.substring(0, 13) : result;
}

function updateDisplay(number) {
    let display = input.textContent;
    if (number === "." && display.includes(".")) number = "";
    if (display === "0") input.textContent = "";
    if (number === "." && (display === "0" || display === "")) number = "0.";
    if (display.length >= 13) number = "";
    input.textContent += number;
}

function clearDisplay() {
    input.textContent = "";
}

function clearAll(){
    clearDisplay();
    input.textContent = "0";
    operand1 = null;
    operand2 = null;
    operator = null;
    operatorSelected = false;
    isEquals = false;
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

function computeResults() {
    if (!operatorSelected) {
        operand2 = parseFloat(input.textContent);
        clearDisplay();
        updateDisplay(operate(operator, operand1, operand2));
        operand1 = parseFloat(input.textContent);
        operand2 = null;
        operatorSelected = true;
    }
}

btns.forEach( button => button.addEventListener("click", (e) => {
    const btnClasses = e.target.classList;
    // clear display
    if (btnClasses.contains("btnC")) clearAll();
    // backspace
    if (btnClasses.contains("btnB")) removeDigit();
    // add number to display
    if (btnClasses.contains("btnr2")) {
        if (operatorSelected) {
            clearDisplay();
            operatorSelected = false;
        }
        if (isEquals) {
            operand1 = null;
            isEquals = false;
        }    
        updateDisplay(e.target.textContent);
    }

    if (btnClasses.contains("op")) {
        if (operand1 === null || operand1 === undefined ) {
            operand1 = parseFloat(input.textContent);
            operatorSelected = true;
        } else {
            computeResults();
        }
        operator = saveOperator(e);
        isEquals = false;
    }

    if (btnClasses.contains("btnEQ")) {
        if (operand1 !== null && operand1 !== undefined ) {
            computeResults();
            isEquals = true;
        }
    }
}));


