//razmisliti o redosljedu izvrsavanja koda
//prouciti objekt promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
function display(data){
    console.log(data)
   }
const futureData = fetch('https://oss.unist.hr/something') //prouciti  https://javascript.info/fetch
futureData.then(display);
   
console.log("Me first!");