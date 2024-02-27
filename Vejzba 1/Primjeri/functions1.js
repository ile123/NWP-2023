//deklaracija funkcije u JS
function copyArrayAndMultiplyBy2(array) {
    const output= [];
    for (let i=0; i<array.length; i++) {
            output.push(array[i] *2);
        }
        return output; 
}


const myArray= [1,2,3];
const result1 = copyArrayAndMultiplyBy2(myArray)
console.log(result1)
const result2 = copyArrayAndMultiplyBy2(result1)
console.log(result2)