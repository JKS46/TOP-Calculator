const buttonPressed = document.querySelectorAll(".btns>button");
const display = document.querySelector('#display');
const replaceChars = {"•":".","x":"*"};
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
        equal();
    }else if(target.textContent == "+/-"){
        display.textContent = display.textContent * -1;
        if(display.textContent == "NaN"){
            alert("Invalid input");
            reset();
        }
    }else if(target.classList.contains("op")){
        doubleOperator++;
         /* To prevent stuff like <+-*> all typed back to back*/
        if(doubleOperator>1){
            backspace();
            backspace();
            backspace();
        }
        display.textContent += " "+target.textContent+" ";
    }
    else{
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
    if(display.textContent == ""){
        display.textContent = "0";
    }
}

function equal(){
    display.textContent = display.textContent.replace(/[•x]/g,char => replaceChars[char]);

    let operands = display.textContent.split(" ");
    operand1 = Number(operands[0]);
    operand2 = Number(operands[2]);
    operator = operands[1];

    console.log(operand1,operand2,operator);

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
            result = operand1 / operand2;
            if(result % 1 != 0){
                result = result.toFixed(2);
            }
            break;
        default:
            alert("Something went wrong");
    }
    display.textContent = result;
}