//closure i zahvaljujući njemu praćenje varijabli-vidi se array i iterator varijabla

function createNewFunction(array){
    let i = 0;
    function inner(){
        const element = array[i];
        i++;
        return element;
    }
    return inner;
}

const returnNextElement= createNewFunction([4, 5, 6]);
const element1 = returnNextElement();
const element2 = returnNextElement();
const element2 = returnNextElement();
console.log(element1);//4
console.log(element2);//5
console.log(element2);//6


//lexicaly scoped language-pozicija deklaracije funkcije određuje scope vidljivih varijabli u trenutku kada se ta funkcija pozove
//function persisting lexical scoped references (surrounding data when they were declared)
//returnNextElement je iterator funkcija
