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

function writeToDisplay(number) {
    let display = input.textContent;
    if (number !== "." && display === "0") clearDisplay();
    if (number === "." && display.includes("."))  number = "";

    input.textContent += number;
}

function clearDisplay() {
    input.textContent = "";
}

btns.forEach( button => button.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnr2")) writeToDisplay(e.target.textContent);
    console.log(e);
}));
