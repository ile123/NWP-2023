//class - syntactic sugar za prethodni primjer-deklaracija je na jednom mjestu

class UserCreator {//kljucna rijec class umjesto kljucne rijeci function
    constructor (name, score){//u konstrutor ide ono što inače ide u function dio (a to su propertiji)
    this.name = name;
    this.score = score;
    }
    increment (){ this.score++; }//idu metode (objekt dio funkcije)
    login (){ console.log("login"); }
}

const user1 = new UserCreator("Eva", 9);
user1.increment();

   //class syntactic sugar
   //sve je deklarirano na jednom mjestu
   //isto je kao i primjer 2 i 3, ali nalikuje ostalim OOP jezicima, ali u pozadini to je sve prototype chain

//class - dobije se funkcija + objekt kombinacija
//JS automatizmom u objektni dio funkcije na prototype property ubacuje sve funkcije koje se navode
// unutar constructor kljcne rijeci ide "funkcijski" dio funkcije UserCreator()