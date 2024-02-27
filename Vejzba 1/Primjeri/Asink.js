//podsjetnik kako JS izvršava kod-jedan thread

function printHello(){
    console.log("Hello");
}

//function blockFor1Sec(){

//}

//setTimeout(printHello, 0);
setTimeout(printHello, 5000);
//blockFor1Sec();
console.log("Me first!");
//console.log("Me first!");
//console.log("Me first!");
//console.log("Me first!");
//console.log("Me first!");