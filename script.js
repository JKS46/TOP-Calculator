const buttonPressed = document.querySelectorAll(".btns>button");
const display = document.querySelector('#display');
const replaceChars = {"•":".","x":"*"};
let doOperation = 0;
let doubleOperator = 0;
let operand1 = 0;
let operand2 = 0;
let operator2 = "";
let operator = "";
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
        getOperands();
        if(operand2 == 0){
            alert("Invalid input");
            reset();
            return;
        }
        equal();
    }else if(target.textContent == "+/-"){
        display.textContent = display.textContent * -1;
        if(display.textContent == "NaN"){
            alert("Invalid input");
            reset();
        }
    }else if(target.textContent == "•"){
        if(hasDot == 1){
            alert("You can't have more than one decimal point");
            return;
        }
        display.textContent += "•";
        hasDot=1;
    }else if(target.classList.contains("op")){
        hasDot = 0;
        doubleOperator++;
         /* To prevent stuff like <+-*> all typed back to back*/
        if(operator2 != undefined && operand1 !=0){
            console.log(operator2," operator2",operand1," operand1");
            doubleOperator++;
        }
        if(doubleOperator>1){
            backspace();
        }
        display.textContent += " "+target.textContent+" ";

        getOperands();
        if(operand2 != 0){
            doubleOperator = 0;
            equal();
        }
    }else{
        if(display.textContent.length >24){
            alert("This is too long");
            return
        }

        doubleOperator = 0;

        if(display.textContent == "0"){
            display.textContent = "";
        }
        display.textContent += target.textContent;
    }
}
/* touch and key both? */

function reset(){
    display.textContent = "0";
    operand1 = 0;
    operand2 = 0;
    operator = "";
    operator2 = "";
    result = 0;
    doubleOperator = 0;
    doOperation = 0;
}

function backspace(){
    display.textContent = display.textContent.slice(0,-1);

    let opDisplay = display.textContent[display.textContent.length-1];

    if(opDisplay == "+" || opDisplay == "-" || opDisplay == "x" || opDisplay == "/"){
        display.textContent = display.textContent.slice(0,-1);
        display.textContent = display.textContent.slice(0,-1);
    }
    if(display.textContent == ""){
        display.textContent = "0";
    }
}

function equal(){
    if(operand1 == "NaN" || operand2 == "NaN"){
        alert("Invalid input");
        reset();
        return;
    }

    if(operand1.length > 10 || operand2.length > 10){
        alert("This is too long");
        return
    }

    switch(operator){
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
                alert("Zero division error");
                reset();
                return;
            }
            result = operand1 / operand2;
            break;
        default:
            alert("Operator error");
    }
    if(result % 1 != 0){
        result = result.toFixed(2);
    }
    display.textContent = result;
    if(operator2 != undefined){
        display.textContent = result+" "+operator2+" ";
    }
    display.textContent = display.textContent.replace(".","•");
    display.textContent = display.textContent.replace("*","x");
    console.log("___________________________");
}

function getOperands(){
    let correctDisplay = display.textContent.replace(/[•x]/g,char => replaceChars[char]);
    let operands = correctDisplay.split(" ");
    console.log(operands);
    operand1 = Number(operands[0]);
    operator = operands[1];
    operand2 = Number(operands[2]);
    operator2 = operands[3];

    console.log(operand1,operator,operand2,operator2);
}