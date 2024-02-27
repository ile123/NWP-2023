//prototype chain
//under the hood oop in JS
//__proto__ hidden property-link na userFunctionstore

function userCreator (name, score) {
    const newUser = Object.create(userFunctionStore); // idalje je kreiran prazan objekt, ali ima poveznicu na userFunctionStore
    newUser.name = name;
    newUser.score = score;
    return newUser;
   };
const userFunctionStore = {
    increment: function(){this.score++;},
    login: function(){console.log("Logged in");}
};
const user1 = userCreator("Lucija", 3);
const user2 = userCreator("Filip", 5);
user1.increment();//implicitni parametar this

 //rjesen je problem kako dodati sve funkcije(metode) na isto mjesto
 //ako JS ne pronadje property na svom objektu, odmah gleda u hidden __proto__
 //svaki objekt u JS-u ima hidden property __proto__ 
 //sve funkcije imaju this, samo je pitanje na sto se on odnosi
