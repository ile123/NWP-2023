//Ponavljanje: da nema linije return add2, nikada se ne bi moglo izvršiti njeno tijelo funkcije add2()


function createNewFunction(){
    function add2(num){
        return num + 2;
    }
    return add2;
}

const newFunction= createNewFunction();
const result = newFunction(3);