//podsjetnik kako JS izvršava kod-jedan thread

function printHelloFirst(){
    console.log("Hello first");
    //setTimeout(()=>(console.log("I'm inside hello first!!!")), 0)
}

function printHelloSecond(){
    console.log("Hello second");
}

function printHelloThird(){
    console.log("Hello third");
}

function block(){
    for(let i=0; i < 10000000000; i++){
        ;
    }
    console.log("Blocking code")
}
setTimeout(printHelloFirst, 0)
setTimeout(printHelloSecond, 0);

//block()
//setTimeout(printHelloThird, 3000);
console.log("Me first!");
