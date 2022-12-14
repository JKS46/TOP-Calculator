const buttonPressed = document.querySelectorAll(".btns>button");
const display = document.querySelector('#display');
const replaceChars = {"•":".","x":"*"};
const replaceCharsBack = {".":"•","*":"x"};
let operand1 = "";
let operator1 = "";
let operand2 = "";
let operator2 = "";
let result = 0;
let hasDot = false;

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
        convertToString();

        operand1 = operand1 * -1;
        if(operand2 != ""){
            operand2 = operand2 * -1;
        }
        console.log(operand1,operand2);
        convertToString();

        operand1 = operand1.replace(/[*.]/g,m => replaceCharsBack[m]);
        operand2 = operand2.replace(/[*.]/g,m => replaceCharsBack[m]);
        operator1 = operator1.replace(/[*.]/g,m => replaceCharsBack[m]);

        displayOperation();
    }else if(target.textContent == "•"){
        if(operand2 == "" && operator1 == ""){
            operand1 = operand1.toString();
            hasDot = operand1.includes("•");
            if(hasDot == true){
                alert("You can't have more than one decimal point");
                return;
            }
            operand1 += "•";
            
        }else{
            operand2 = operand2.toString();
            hasDot = operand2.includes("•");
            if(hasDot == true){
                alert("You can't have more than one decimal point");
                return;
            }
            operand2 += "•";
        }
        displayOperation();
    }else if(target.classList.contains("op")){
        hasDot = false;
        if(operator1 != "" && operand2 != ""){
            operator2 = target.textContent;
            equal();
            return
        }
        operator1 = target.textContent;
        if(operand1 == "" && operator1 != "" ){
            operand1 = 0;
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
        if(operand1.length > 10 || operand2.length > 10){
            alert("Maximum length can't cross 10 for each operand");
            backspace();
            return
        }
    }
}

function reset(){
    operand1 = "";
    operator1 = "";
    operand2 = "";
    operator2 = "";
    result = 0;
    hasDot = false;
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
    convertToString();

    convertToNumber();

    if(operand1 == "NaN" || operand2 == "NaN"){
        alert("Invalid input");
        reset();
        return;
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

    if(result.length > 24){
        alert("Too long,I won't do it");
        reset();
        return
    }

    if(result == "Infinity" || result == "-Infinity" || result == "NaN"){
        alert("Result went haywire");
        reset();
        return;
    }
    console.log(operand1,operator1,operand2,operator2," =>[num1 op1 num2 op2]");
    display.textContent = result;
    operand1 = display.textContent;
    operand2 = "";
    operator1 = operator2;
    operator2 = "";
    hasDot = 0;

    operand1 = operand1.replace(/[*.]/g,m => replaceCharsBack[m]);
    operator1 = operator1.replace(/[*.]/g,m => replaceCharsBack[m]);

    displayOperation();
}

function displayOperation(){
    display.textContent = operand1 +" "+ operator1 +" "+ operand2;
    if(operand1 == ""){
        display.textContent = "0";
    }
}

function convertToString(){
    operand1 = operand1.toString();
    operand2 = operand2.toString();
    operand1 = operand1.replace(/[•x]/g,m => replaceChars[m]);
    operand2 = operand2.replace(/[•x]/g,m => replaceChars[m]);
    operator1 = operator1.replace(/[•x]/g,m => replaceChars[m]);
    operator2 = operator2.replace(/[•x]/g,m => replaceChars[m]);
}

function convertToNumber(){
    operand1 = Number(operand1);
    operand2 = Number(operand2);
}