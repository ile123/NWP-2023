//poziv funkcije u istoj funkciji u kojoj je deklarirana
function outer(){
    let counter=0; 
    function incrementCounter (){
        counter++;   
    }
    incrementCounter();
    console.log(counter)
}
outer();
outer();
outer();
outer();




