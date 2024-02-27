const user1 = {
    name: "Will",
    score: 3,
    increment: function() { user1.score++; }
   };
   user1.increment(); 

const user2 = {}; //create an empty object

//assign properties to that object
user2.name = "Tim";
user2.score = 6;
user2.increment = function() {
 user2.score++;
};


const user3 = Object.create(null);
user.name = "Eva";
user3.score = 9;
user3.increment = function() {
 user3.score++;
};

