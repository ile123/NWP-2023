//razmisliti o redosljedu izvrsavanja koda
//prouciti objekt promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
import fetch from "node-fetch";

function display(data){
    console.log(data)
    //console.log("Ovo je vanjski scope " + data.json().then((value)=>(console.log(value))) + "do tu")
   //data.json().then((value)=>(console.log(value.msg1)))
}
const futureData = fetch('https://demo0945922.mockable.io/')
futureData.then(display);
   
console.log("Me first!");