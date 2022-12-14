const buttonPressed = document.querySelectorAll(".btns>button");
const display = document.querySelector('#display');
const replaceChars = {"•":".","x":"*"};
let operand1 = "";
let operator1 = "";
let operand2 = "";
let operator2 = "";
let result = 0;
let hasDot = 0;

buttonPressed.forEach((button) =>{
    button.addEventListener("click",calculator);
});

function calculator(e){
    const target = e.target;

    /* key press effects */
    target.classList.add("pressed");
    setTimeout(function(){
        target.classList.remove("pressed");
    }
    ,250);

    if(target.textContent == "Clear"){
        reset();
    }
    else if(target.textContent == "⌫"){
        backspace();
    }
    else if(target.textContent == "="){
        equal();
        displayOperation();
    }else if(target.textContent == "+/-"){
        operand1 = operand1 * -1;
        if(operand2 != ""){
            operand2 = operand2 * -1;
        }
        displayOperation();
    }else if(target.textContent == "•"){
        if(hasDot == 1){
            alert("You can't have more than one decimal point");
            return;
        }

        if(operand2 == ""){
            operand1 += "•";
        }else{
            operand2 += "•";
        }
        displayOperation();
    }else if(target.classList.contains("op")){
        hasDot = 0;
        operator1 = target.textContent;
        if(operand1 != "" && operand2 != ""){
            equal();
        }
        displayOperation();
    }else{
        if(operator1 != ""){
            operand2 += target.textContent;
        }else{
            if(operand1 == 0){
                operand1 = "";
            }
            operand1 += target.textContent;
        }
        displayOperation();
    }  
}

function reset(){
    operand1 = "";
    operator1 = "";
    operand2 = "";
    operator2 = "";
    result = 0;
    hasDot = 0;
    display.textContent = "0";
}

function backspace(){
    if(operand2 != ""){
        operand2 = operand2.slice(0,-1);
    }else if(operator1 != ""){
        operator1 = "";
    }else if(operand1 != ""){
        operand1 = operand1.slice(0,-1);
    }

    if(operand1 == ""){
        operand1 = 0;
    }
displayOperation();
}

function equal(){
    operand1 = operand1.toString();
    operand2 = operand2.toString();

    operand1 = operand1.replace(/[•x]/g,m => replaceChars[m]);
    operand2 = operand2.replace(/[•x]/g,m => replaceChars[m]);
    operator1 = operator1.replace(/[•x]/g,m => replaceChars[m]);

    operand1 = Number(operand1);
    operand2 = Number(operand2);

    if(operand1 == "NaN" || operand2 == "NaN"){
        alert("Invalid input");
        reset();
        return;
    }
    if(operand1.length > 10 || operand2.length > 10){
        alert("This is too long");
        return
    }
    switch(operator1){
        case "+":
            result = operand1 + operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "*":
            result = operand1 * operand2;
            break;
        case "/":
            if(operand2 == 0){
                alert("Cannot divide by 0");
                reset();
                return;
            }
            result = operand1 / operand2;
            break;
        default:
            alert("Operator error");
            reset();
    }

    if(result % 1 != 0){
        result = result.toFixed(2);
    }

    display.textContent = result;
    operand1 = display.textContent;
    operand2 = "";
    operator1 = "";
    operator2 = "";
    hasDot = 0;
}

function displayOperation(){
    display.textContent = operand1 +" "+ operator1 +" "+ operand2;
}