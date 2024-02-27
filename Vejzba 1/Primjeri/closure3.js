//poziv funkcije izvan funkcije u kojoj je deklarirana
// uociti kako i kad se mijenja vrijednost varijable counter

//counter = 0 - sto ako se ovdje deklarira  1 2 3 4 5

function outer(){
    let counter=0; //1 2 3 1 2 
    function incrementCounter(){ 
        //let counter=0;, sto bi se dogodilo sada? 1 1 1 1 1
        counter++;
        console.log(counter); 
    }
    return incrementCounter;
}

const myNewFunction=outer();
myNewFunction();
myNewFunction();
myNewFunction();

//const nesto = myNewFunction;
//nesto();

const anotherFunction=outer();
anotherFunction();
anotherFunction();




