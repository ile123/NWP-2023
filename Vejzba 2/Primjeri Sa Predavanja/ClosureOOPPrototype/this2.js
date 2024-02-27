//mala izmjena u odnosu na prethodni primjer dodana funkcija add1()
function userCreator(name, score) {
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUser.score = score;
    return newUser;
};

const userFunctionStore = {
    increment: function() {
        function add1(){ this.score++; } 
        add1()
    }
};

const user1 = userCreator("Carlo", 3);
const user2 = userCreator("Luka", 5);
user1.increment();

// umjesto add1() staviti add1.call(this), 
//prvi argument -implicitni this, a ostali argumenti su argumenti funkcije ako ih ima
