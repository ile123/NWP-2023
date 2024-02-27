//poziv funkcije u istoj funkciji u kojoj je deklarirana
function outer(){
    let counter=0; 
    function incrementCounter (){
        counter++;   
    }
    incrementCounter();
}
outer();



