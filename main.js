//variables
const displayText = document.querySelector('.displayText');

const numButtons = document.querySelectorAll('.bNum');
const decimalButton = document.querySelector('#bDecimal');
const backspaceButton = document.querySelector('#bBackspace');
const addButton = document.querySelector('#bAdd');
const subtractButton = document.querySelector('#bSubtract');
const multiplyButton = document.querySelector('#bMultiply');
const divideButton = document.querySelector('#bDivide');
const equalsButton = document.querySelector('#bEquals');
const clearButton = document.querySelector('#bClear');


let displayValue = 0;
let operatorValue = '';
let clearSwitch = 0;
let operatorSwitch = 0;

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

//function used by the operation button (+, -, *, /) event listeners
const setOperationButtonBehavior = function(opValue) {
    //if the most recent button pressed was an operator, change operator value to this button instead and cancel operation
    if(operatorSwitch) {
        operatorValue = opValue;
        return;
    }
    //store current displayValue variable value and displayText value before changing them
    let tempa = displayValue;
    let tempb = Number(displayText.textContent);
    displayValue = Number(displayText.textContent);
    //if there has been operation before hitting this button, display result of first operation
    if(operatorValue) {
        displayText.textContent = 
            operate(operatorValue, tempa, tempb);
        //if result is bigger than the screen allows, switch to exponential
        displayText.textContent = limitDisplayValue(displayText.textContent);    
        //now that the displayValue has changed, need to store it again for next operation
        displayValue = Number(displayText.textContent);
    };
    operatorValue = opValue;
    //set clear switch so the next number button press clears screen (rather than adding number to end of result)
    clearSwitch = 1;
    //set operator switch in case the next button pressed is another operator
    operatorSwitch = 1;
}

//function to limit displayed value length after operation
const limitDisplayValue= function(value) {
    let string = value.toString();
    let num = Number(value);
    let result;
    if (string.length > 13) {
        result = num.toExponential();
        return result;
    }
    else return value;
}

//event listeners
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // if user presses 0 before any other number, clear it before displaying the second number
        if (displayText.textContent === '0') clearSwitch = 1;
        // if clearSwitch is set to 1, clear display before displaying number
        if (clearSwitch) displayText.textContent = '';
        // limit total digits on display screen
        if (displayText.textContent.length === 13) return;
        // this is where the display is actually changed
        displayText.textContent += button.textContent;
        // reset clearSwitch so next number entered does not clear screen
        clearSwitch = 0;
        // reset operatorSwitch so next operator functions normally
        operatorSwitch = 0;
    });
});

decimalButton.addEventListener('click', ()  => {
    // limit total digits on display screen
    if (displayText.textContent.length === 14) return;
    // if clearSwitch is set to 1, set display to 0 before adding decimal to it
    if (clearSwitch) displayText.textContent = '0';
    // if display value already has decimal, do nothing
    if (displayText.textContent.includes('.')) return;
    displayText.textContent += decimalButton.textContent;
    // reset clearSwitch so next number entered does not clear screen
    clearSwitch = 0;
    // reset operatorSwitch so next operator functions normally
    operatorSwitch = 0;
});

backspaceButton.addEventListener('click', () => {
    //if the previous button press was an operator, reset operator value, then do nothing
    if(operatorSwitch) {
        operatorValue = '';
        return;
    }
    displayText.textContent = displayText.textContent.substring(0, displayText.textContent.length - 1);
    if (displayText.textContent === '') displayText.textContent = 0;
});


clearButton.addEventListener('click', () => {
    displayText.textContent = '0';
    displayValue = 0;
    operatorValue = '';
});

addButton.addEventListener('click', () => {
    setOperationButtonBehavior('a');
});

subtractButton.addEventListener('click', () => {
    setOperationButtonBehavior('s');
});

multiplyButton.addEventListener('click', () => {
    setOperationButtonBehavior('m');
});

divideButton.addEventListener('click', () => {
    setOperationButtonBehavior('d');
});

equalsButton.addEventListener('click', () => {
    //this is in case user only enters 1 value (with no operator or second value), then hits equals
    if(!operatorValue) {
        clearSwitch = 1;
        return;
    }
    //if the previous button press was an operator, reset operator value, then do nothing
    if(operatorSwitch) {
        operatorValue = '';
        return;
    }
    displayText.textContent = 
        operate(operatorValue, displayValue, Number(displayText.textContent));
    //if result is bigger than the screen allows, switch to exponential
    displayText.textContent = limitDisplayValue(displayText.textContent);
    //reset operatorValue so next operation knows not to use the previous value
    operatorValue = '';
    //toggle clear switch so next number press clears screen
    clearSwitch = 1;
    operatorSwitch = 0;
})