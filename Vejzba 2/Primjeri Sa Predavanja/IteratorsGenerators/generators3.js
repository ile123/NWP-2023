//yield se moze zamisliti kao pseudopauziranje koda [[generatorLocation]]-pozicija u funkciji koja se runa
function *createFlow(){
    const num = 10;
    const newNum = yield num; //kao da je broj 2 argument koji se ubacuje u execution context
    yield 5 + newNum;
    yield 6;
}

const returnNextElement= createFlow();
const element1 = returnNextElement.next();//10 {value:10, done:false}
const element2 = returnNextElement.next(2);//7
const element3 = returnNextElement.next();//6

console.log(element1);
console.log(element2);
console.log(element3);