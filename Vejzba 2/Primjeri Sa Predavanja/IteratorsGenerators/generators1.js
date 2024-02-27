//priprema za razumijevanje generator funkcija 
function createFlow(array){
    let i = 0;
    const inner = {next:
        function(){
        const element = array[i];
        i++;
        return element;
        }
        
    }
    return inner;
}

const returnNextElement= createFlow([4, 5, 6]);
//povrat je inner objekt koji na sebi ima next property (u nasem slucaju je next metoda), 
//koja sa sobom nosi hidden property [[scope]] 
//(closure-vidljiv je array i varijabla i)
const element1 = returnNextElement.next();//{value:4, done:false}
const element2 = returnNextElement.next();//{value:5, done:false}
const element3 = returnNextElement.next();//{value:6, done:false}
const element4 = returnNextElement.next();//undefined {value:undefined, done:true}

console.log(element1)
console.log(element2)
console.log(element3)
console.log(element4)