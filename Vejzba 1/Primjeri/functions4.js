//higher order function copyArrayAndManipulate() kojoj je kao argument prosljedjena funkcija arrow funkcija multiplyBy2

function copyArrayAndManipulate(array, instructions) {
    const output= [];
    for (let i = 0; i < array.length; i++) {
        output.push(instructions(array[i]));   
    }
    return output;
}
const multiplyBy2 = input => input*2
const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);
//const result=copyArrayAndManipulate([1, 2, 3], input=>input*2);
