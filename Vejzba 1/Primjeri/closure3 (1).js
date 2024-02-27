//poziv funkcije izvan funkcije u kojoj je deklarirana
// uociti kako i kad se mijenja vrijednost varijable counter
function outer(){
    let counter=0;
    function incrementCounter(){ 
        counter++;
        console.log(counter); 
    }
    return incrementCounter;
}

const myNewFunction=outer();
myNewFunction();
myNewFunction();
myNewFunction();

const anotherFunction=outer();
//anotherFunction();
//anotherFunction();




