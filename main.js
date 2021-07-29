//variables
const displayText = document.querySelector('.displayText');

const numButtons = document.querySelectorAll('.bNum');
const addButton = document.querySelector('.bAdd');
const substractButton = document.querySelector('.bSubtract');
const multiplyButton = document.querySelector('.bMultiply');
const divideButton = document.querySelector('.bDivide');
const equalsButton = document.querySelector('.bEquals');
const clearButton = document.querySelector('.bClear');

let displayValue = 0;
let operatorValue = '';

//functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = function(op, a, b) {
    let result = 0;
    switch(op) {
        case 'a':
            result = add(a, b);
            break;
        case 's':
            result = subtract(a, b);
            break;
        case 'm':
            result = multiply(a, b);
            break;
        case 'd':
            result = divide(a, b);
            break;
    };
    return result;
};

//event listeners
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        displayText.textContent += button.textContent;
    });
});

clearButton.addEventListener('click', () => {
    displayText.textContent = '';
    displayValue = 0;
});

addButton.addEventListener('click', () => {
    operatorValue = 'a';
    displayValue = Number(displayText.textContent);
    displayText.textContent = '';
});    

equalsButton.addEventListener('click', () => {
    displayText.textContent = 
        operate(operatorValue, displayValue, Number(displayText.textContent));
})

//testing
