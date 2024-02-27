// ključna riječ this
function userCreator(name, score) {
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUser.score = score;
    return newUser;
};

const userFunctionStore = {
    increment: function() {
        this.score++;
    }
};
const user1 = userCreator("Ivo", 3);
const user2 = userCreator("Mia", 5);
user1.increment();