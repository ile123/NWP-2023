//što se nadamo da će returnNextElement.next() vratiti-kako i zašto?
//generator funkcije

function *createFlow(){
    yield 4;
    yield 5;
    yield 6;
}

const returnNextElement= createFlow();
const element1 = returnNextElement.next();
const element2 = returnNextElement.next();
const element3 = returnNextElement.next();
console.log(element1);
console.log(element2);
console.log(element3);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
//yield - slično return ključnoj riječi, samo što ne završava funkciju, nego je pauzira (ne briše se execution contekst)