

//Calculator operator
const operate = function(a, b, operator){
    return operator(a,b);
}

//Operator Functions
const add = function(a, b){
    return a + b;
}
const subtract = function(a, b){
    return a - b;
}
const multiply = function(a,b){
    return a * b;
}
const divide = function(a, b){
    if(b === 0){
        return "MATH ERROR";
    }
    return a/b;
}

