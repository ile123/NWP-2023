//odakle metoda hasOwnProperty??
//svi objekti u JS-u imaju defaultni __proto__ i on linka na globalni Object.prototype : 
//tu se nalazi funkcionalnost hasOwnProperty()
//kad god se kreira novi objekt u JS-u on na sebi ima __proto__ koji u linka na Object.prototype
//i Object.prototype ima svoje __proto__ svojstvo i ono je postavljeno na null (gotov je prototype chain)

function userCreator (name, score) {
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUser.score = score;
    return newUser;
   };
const userFunctionStore = {
    increment: function(){this.score++;},
    login: function(){console.log("Logged in");}
};
const user1 = userCreator("Gabriela", 3);
const user2 = userCreator("Borna", 5);
user1.hasOwnProperty('score')