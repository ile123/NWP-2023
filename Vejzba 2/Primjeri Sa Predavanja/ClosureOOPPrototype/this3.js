//arrow function and this keyword
// this je lexicaly scoped-this ima vrijednost koju je imao na mjestu gjde je arrow funkcija deklarirana
//this se postavlja u momentu definiranja
function userCreator(name, score) {
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUser.score = score;
    return newUser;
};

const userFunctionStore = {
    increment: function() {
        const add1 = () => { this.score++; }
        add1()
    }
};

const user1 = userCreator("Marina", 3);
const user2 = userCreator("Sime", 5);
user1.increment();

//sto bi se dogodilo ako bi funkcija increment koja se nalazi u userFunctionStore objektu bila arrow funkcija??
//metode se nikad ne pisu kao arrow funkcije, samo ako se unutar metode nalazi funkcija-onda je pisemo u obliku arrow funkcije
//u našem slučaju bi this bio od objekta userFunctionStore-ne bi radilo kako očekujemo 
//this key word u slucaju arrow funkcije je lexicaly scoped

