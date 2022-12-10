const container = document.querySelector('#container');
const display = document.querySelector('#display');

container.addEventListener("click",calculator);

function calculator(e){
    const target = e.target;

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
    }
    else{
        if(display.textContent == "0"){
            display.textContent = "";
        }
        display.textContent += target.textContent;
    }
}
/* touch and key both? */

function reset(){
    console.log("clear");
    display.textContent = "0";
}

function backspace(){
    console.log("backspace");
    display.textContent = display.textContent.slice(0,-1);
    if(display.textContent == ""){
        display.textContent = "0";
    }
}

function equal(){

}