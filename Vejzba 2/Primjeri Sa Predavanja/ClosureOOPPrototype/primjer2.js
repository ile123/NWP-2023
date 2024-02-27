//opcenitiji zapis u odnosu na raniji primjer
function userCreator(name, score) {
    const newUser = {};
    newUser.name = name;
    newUser.score = score;
    newUser.increment = function() {
    newUser.score++;
    };
    return newUser;
   };

const user1 = userCreator("Marina", 3);  
const user2 = userCreator("Marko", 5); 
//sto je newUser za funkciju increment?? prisjetiti se kako radi closure 

user1.increment();

//koliko se puta sacuva funkcija increment?? kopira se pri kreaciji svakog objekta
//ponavljanje koda koje se treba izbjeci
//u sljedecem primjeru je unaprijedjeno
//ovaj nacin zapisa sluzi za razumijevanje, ali nije standard u smislu kodiranja
