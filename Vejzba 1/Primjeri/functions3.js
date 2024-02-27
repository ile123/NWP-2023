//Razni nacini definiranja funkcije
function multiplyBy2(input) { 
    return input*2; }

const multiplyBy2 = function(input) { 
    return input*2; }

const multiplyBy2= (input) => { return input * 2 };

// ako je jedna linija koda u funkciji, onda ne treba vitičasta zagrada ni return
const multiplyBy2= (input) => input * 2;

//ako je jedan argument, onda je opcionalno pisati obične zagrade za argument
const multiplyBy2 = input => input * 2;

const output = multiplyBy2(3);
console.log(output);