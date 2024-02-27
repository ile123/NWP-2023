//multiplyBy2 je callback funkcija-prosljedjuje se kao
//argument opcenitije funkcije copyArrayAndDoOperations

function copyArrayAndDoOperations(array, functionality) {
    const output= [];
    for (let i=0; i<array.length; i++) {
        output.push(functionality(array[i]));   
        }
        return output;
    }

function multiplyBy2(input) { 
    return input * 2; }

const result = copyArrayAndDoOperations([1, 2, 3], multiplyBy2);