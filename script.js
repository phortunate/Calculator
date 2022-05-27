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

btns.forEach( button => button.addEventListener("click", (e) => {
    const btnClasses = e.target.classList;
    // clear display
    if (btnClasses.contains("btnC")) clearDisplay(0);
    // backspace
    if (btnClasses.contains("btnB")) removeDigit();
    // add number to display
    if (btnClasses.contains("btnr2")) updateDisplay(e.target.textContent);
    // console.log(e);
}));
