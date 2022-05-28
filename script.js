const input = document.querySelector(".input");
const btns = Array.from(document.querySelectorAll("button"));
const btnDec = document.querySelector(".btnDec");
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
    return a / b;
}

function operate(operator, a, b) {
    return operator(a , b);
}

function updateDisplay(number) {
    let display = input.textContent;
    if (number === ".") btnDec.disabled = true;
    if (display === "0") input.textContent = "";
    if (number === "." && (display === "0" || display === "")) number = "0.";

    input.textContent += number;
}

function clearDisplay() {
    input.textContent = "";
    btnDec.disabled = false;
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
        operand2 = parseInt(input.textContent);
        clearDisplay();
        updateDisplay(operate(operator, operand1, operand2));
        operand1 = parseInt(input.textContent);
        operand2 = null;
        operatorSelected = true;
        btnDec.disabled = false;
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
            operand1 = parseInt(input.textContent);
            operatorSelected = true;
            btnDec.disabled = false;
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


