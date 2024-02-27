//kreiranje objekta user1: podaci + metode
const user1 = {
    name: "Mirko",
    score: 3,
    increment: function() { user1.score++; }
   };
user1.increment();

//problem?potrebno je generalizirati kreiranje objekata



const user2 = {}; //kreiranje praznog objekta user2
//dodvanje propertija objekt user2
user2.name = "Mate";
user2.score = 6;
user2.increment = function() {
 user2.score++;
};

//koristeci Object.create koja kreira prazan objekt-bez obzira na argumente u zagradama
//ako su u zagradama drugaciji argumenti od null, to je i dalje prazan objekt
const user3 = Object.create(null);
user3.name = "Eva";
user3.score = 9;
user3.increment = function() {
 user3.score++;
};



