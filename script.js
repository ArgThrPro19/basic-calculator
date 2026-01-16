let value = "";
let saveValue = "";
const MAX_DIGITS = 20;
let decimal = "";
let isDecimal = false;
let botDisplay = document.querySelector(".display span");
let topDisplay = document.querySelector(".display p");
let numbers = document.querySelector(".numbers");
let operators = document.querySelector(".operators");
let currOperator = "";
let currOperatorSym = ""
let hasOperated = false;
let isResult = false;
let equalsButton = document.querySelector(".operators #equals")

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
    if(isResult){
        clear(false);
    }
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
});

operators.addEventListener("click", function (e){
    if(botDisplay.textContent === "MATH ERROR" || botDisplay.textContent === "OVERFLOW ERROR")
        return;
    if(e.target.id === "")
        return;
    else if (e.target.id === "equals"){
        if(saveValue !== "" && currOperator !== "" && value !== ""){
            topDisplay.textContent += " " + value + decimal;
            value = operate(saveValue, value + decimal, currOperator);
            decimal = "";
            if(value === undefined){
                clear();
                return;
            }
            updateDisplay();
            isResult = true;
            currOperator = "";
            currOperatorSym = "";
        }
    }
    else{
        if(value === ""){
            botDisplay.textContent = "MATH ERROR";
            clear(false);
            return;
        }
        if(currOperator !== ""){
            if(saveValue !== ""){
            topDisplay.textContent += " " + value + decimal;
            value = operate(saveValue, value + decimal, currOperator);
            decimal = "";
            if(value === undefined){
                clear();
                return;
            }
            updateDisplay();
            isResult = true;
        }}
        isResult = false;
        saveValue = botDisplay.textContent;
        switch(e.target.id){
            case "add":
                currOperator = add;
                currOperatorSym = "+";
                break;
            case "subtract":
                currOperator = subtract;
                currOperatorSym = "–";
                break;
            case "multiply":
                currOperator = multiply;
                currOperatorSym = "x";
                break;
            case "divide":
                currOperator = divide;
                currOperatorSym = "/"
                break;
        }
        topDisplay.textContent = saveValue +  " " + " " + currOperatorSym;
        resetValue();
        updateDisplay();
    }

});




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
    return Math.round((a / b) * 1e5) / 1e5;
}

//reset
function resetValue(){
    value = "";
    isDecimal = false;
    decimal = "";
}
function clear(updateText = true){
    saveValue = "";
    if(updateText)
        topDisplay.textContent = saveValue;
    else
        topDisplay.textContent = value;
    resetValue();
    currOperator = "";
    currOperatorSym = "";
    isResult = false;
}