//function + object combination

function userCreator(name, score){
    this.name = name; // sto bi bio this da nema keyword-a new prilikom poziva funkcije?Razmislite!
    this.score = score;
   }
userCreator.prototype.increment = function(){ this.score++; };
userCreator.prototype.login = function(){ console.log("login"); };

const user1 = new userCreator("Ana", 2) //propust u dizajniranju???mora ici new keyword inace nije jasno sto je this
user1.increment()

//u ovoj varijanti propertiji i metode su sačuvane na istom mjestu (function+object kombinacija), ali nisu deklarirane na istom mjestu
//prokomentirati što je ovdje this

//new kljucna rijec ispred imena funkcije obavi sljedeće:
//1. kreira prazan property this 
//2. njegov hidden property __proto__ linka na prototype property-a objektnog dijela funkcije createUser, on je objekt u kojem su nase funkcije increment i login
//3. return-a this property

//sto bi se dogodilo kad bi se u ovoj varijanti funkcija pozvala bez kljucne rijeci new-this bi bio Window
//ukoliko je intencija da se funkcija pozove sa kljucnom rijeci new, bilo bi dobro imenovati je velikim slovom

