let value = "";
let saveValue = "";
const MAX_DIGITS = 12;
let decimal = "";
let isDecimal = false;
let botDisplay = document.querySelector(".display span");
let topDisplay = document.querySelector(".display p");
let numbers = document.querySelector(".numbers");

//display
function updateDisplay(){
    if(checkOverflow()) return;
    if(decimal === ""){
        botDisplay.textContent = value;
        return;
    }
    botDisplay.textContent = value + decimal;
    
}

function checkOverflow(){
    const totalLength = value.length + decimal.length;
    if(totalLength > MAX_DIGITS){
        botDisplay.textContent = "OVERFLOW ERROR";
        clear();
        return true;
    }
    return false;
}

//Making numbers
numbers.addEventListener("click", function (e){
    if(!e.target.classList) return;
    let classes = Array.from(e.target.classList);
    if(classes.includes("clear")){
        clear();
        updateDisplay();
        topDisplay.textContent = "";
    }
    else if (classes.includes("decimal") && !isDecimal){
        isDecimal = true;
        decimal = "."
        updateDisplay();
    }

    else if(classes.includes("number")){
        updateValues(e.target.textContent);
    }
})


//update value
function updateValues(num){
    if(isDecimal)
        decimal += num;
    else
        value += num;
    updateDisplay();
}

//Calculator operator
function operate(a, b, operator){
    return operator(Number(a),Number(b));
}

//Operator Functions
function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a, b){
    if(b === 0){
        botDisplay.textContent = "MATH ERROR";
        clear();
        return;
    }
    return a/b;
}

//reset

function clear(){
    value = "";
    decimal = "";
    saveValue = "";
    topDisplay.textContent = saveValue;
    isDecimal = false;
}