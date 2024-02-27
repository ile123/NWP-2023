//razmisliti o redosljedu izvrsavanja koda
//prouciti objekt promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
import fetch from "node-fetch";

function display(data){
    console.log(data.json().then((value)=>(console.log(value.msg1))))
    //console.log("Ovo je vanjski scope " + data.json().then((value)=>(console.log(value))) + "do tu")
    //console.log("Hello!!!!!!")
}

function printHello(){
    console.log("Hello!");
}

function block(){
    for(let i=0; i < 10000; i++){
        ;
    }
    console.log("Blocking code")
}

setTimeout(printHello,5000)

const futureData = fetch('https://demo0945922.mockable.io/')
futureData.then(display);

//block()
console.log("Me first!");