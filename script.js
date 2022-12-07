const container = document.querySelector('#container');

container.addEventListener("click",calculator);

function calculator(e){
    const target = e.target;
    console.log(target);
   
}

function reset(){
    console.log("clear");
}

function backspace(){
    console.log("backspace");
}