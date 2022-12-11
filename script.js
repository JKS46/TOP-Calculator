const buttonPressed = document.querySelectorAll(".btns>button");
const display = document.querySelector('#display');
const replaceChars = {"•":".","x":"*"};
let doOperation = 0;
let doubleOperator = 0;
let operand1 = 0;
let operand2 = 0;
let operator = "";
let result = 0;

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
        equal();
    }else if(target.textContent == "+/-"){
        display.textContent = display.textContent * -1;
        if(display.textContent == "NaN"){
            alert("Invalid input");
            reset();
        }
    }else if(target.textContent == "•"){
        display.textContent += "•";
    }else if(target.classList.contains("op")){
        doubleOperator++;
         /* To prevent stuff like <+-*> all typed back to back*/
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
}

function backspace(){
    display.textContent = display.textContent.slice(0,-1);

    let opDisplay = display.textContent[display.textContent.length-1];

    if(opDisplay == "+" || opDisplay == "-" || opDisplay == "x" || opDisplay == "/"){
        backspace();
        backspace();
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
            if(operand1 == 0 || operand2 == 0){
                alert("Zero division error");
                reset();
                return;
            }
            result = operand1 / operand2;
            break;
        default:
            alert("Something went wrong");
    }
    if(result % 1 != 0){
        result = result.toFixed(2);
    }
    result = result.toString();
    result = result.replace(".", "•");
    display.textContent = result;
}

function getOperands(){
    let correctDisplay = display.textContent.replace(/[•x]/g,char => replaceChars[char]);
    let operands = correctDisplay.split(" ");
    operand1 = Number(operands[0]);
    operand2 = Number(operands[2]);
    operator = operands[1];
    console.log(operand1,operator,operand2);
}