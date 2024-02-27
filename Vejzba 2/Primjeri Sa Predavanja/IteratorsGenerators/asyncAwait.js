/*Kod izgleda kao da se piše sinkrono, a u biti je asinkron*/

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function createFlow(){
    console.log("Me first");
    const data = await fetch('https://google.com');
    console.log(data);
}

createFlow();
console.log("Me second");
// await pauzira execution context funkcije, dok se promise ne resolve-a (privid sinkronosti)
//čitkije od callback hell-a i od promise chain-a