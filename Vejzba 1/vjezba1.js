//1. Zadatak

const check = (number) => number % 2 == 0 ? true : false

const incrementByOne = (number) => number + 1

const incrementByTwo = (number) => number + 2

const incrementByThree = (number) => number + 3

const incrementByFour = (number) => number + 4

const incrementByFive = (number) => number + 5

const generateRandomNumberArray = () => {
    const array = []
    for(let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 101));
    }
    return array;
}

const vecina = (niz, callback) => {
    let counter = 0;
    for (let i = 0; i < niz.length; i++) {
        if (callback(niz[i])) counter++;
    }
    return niz.length / 2 < counter;
}

const prioritiziraj = (niz, callback) => {
    const new_array = []
    for (let i = 0; i < niz.length; i++) {
        if (callback(niz[i])) {
            new_array.unshift(niz[i]);
        } else {
            new_array.push(niz[i]);
        }
    }
    return new_array;
}

const grupiraj = (niz, callback) => {
    const json = {
        true: [],
        false: []
    }
    for (let i = 0; i < niz.length; i++) {
        if (callback(niz[i])) {
            json.true.push(niz[i]);
        } else {
            json.false.push(niz[i]);
        }
    }
    return json;
}

const komutativnost = (callback_1, callback_2, value) => {
    return callback_1(callback_2(value)) == callback_2(callback_1(value)) ? true : false;
}

const pipe = (functions, value) => functions.reduce((result, func) => func(result), value);

const reduce = (array, callback, accumulator) => {
    for(let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i]);
    }
    return accumulator;
}

const presjek = (niz1, niz2) => {
    return reduce(niz1, (result, element) => {
        if (niz2.includes(element)) {
            result.push(element);
        }
        return result;
    }, []);
};

const unija = (niz1, niz2) => {
    const spojeniNizovi = reduce(niz1, (result, element) => {
        if (!result.includes(element)) {
            result.push(element);
        }
        return result;
    }, niz2.slice());

    return spojeniNizovi;
};

const filter = (array, callback) => {
    const new_array = [];
    for(let i = 0; i < array.length; i++) {
        if(callback(array[i])) new_array.push(array[i]);
    }
    return new_array;
}

const array = [2, 4, 6, 8, 10, 12, 14, 16, 19, 21];
//1. zad
console.log(`1. Zadatak: ${vecina(array, check)}`);
//2. zad
console.log(`2. Zadatak: ${prioritiziraj(array, check)}`);
//3. zad
const json = grupiraj(array, check);
console.log(`3. Zadatak: ${json.true} and ${json.false}`);
//4. zad
console.log(`4. Zadatak: ${komutativnost(incrementByOne, incrementByTwo, 2)}`);
//5. zad
const functions = [incrementByOne, incrementByTwo, incrementByThree, incrementByFour, incrementByFive];
console.log(`5. Zadatak: ${pipe(functions, 2)}`);
//6. zad
const result = reduce(array, (acc, elem)=>acc+elem, 0);
console.log(`6. Zadatak: ${result}`);
//7. zad
console.log(`7. Zadatak: ${presjek([1, 2, 3, 4, 5], [1, 2, 3, 7, 10])}`);
//8. zad
console.log(`8. Zadatak: ${filter([1, 2, 3, 4, 5], check)}`);