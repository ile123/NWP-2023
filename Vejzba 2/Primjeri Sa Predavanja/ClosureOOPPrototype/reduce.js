function add(num1, num2){
    return num1 + num2;
}

function reduce(array, callback, accumulator){
    for(let i= 0; i<array.length; i++){
        accumulator = callback(array[i], accumulator);
    }
return accumulator
}

console.log(reduce([1, 2, 3, 4, 5], add, 0))





