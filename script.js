const container = document.querySelector('#container');
const display = document.querySelector('#display');
let doubleOperator = 0;

container.addEventListener("click",calculator);

function calculator(e){
    const target = e.target;

    /* key press effects */
    target.classList.add("pressed");
    setTimeout(function(){
        target.classList.remove("pressed");
    }
    ,250);

    if(display.textContent.length >27){
        alert("This is too long");
        return
    }

    if(target.textContent == "Clear"){
        reset();
    }
    else if(target.textContent == "⌫"){
        backspace();
    }
    else if(target.textContent == "="){
        equal();
    }
    else{
        if(target.classList.contains("op")){
            doubleOperator++;
        }
        else{
            doubleOperator=0;
        }

        if(doubleOperator>1){
            backspace();
        }

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
    console.log("equals");

}