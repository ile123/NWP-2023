//generator funkcije generiraju sljedeći element
//closure + pozicija [[generatorLocation]]
//imamo kontrolu manulalno se vratiti u execution context sa metodom next() 
//na ovaj način se možemo manualno vraćati u execution context svaki put kada se recimo obradi neki request na server

function doWhenDataReceived (value){  
    returnNextElement.next(value);
}

function* createFlow(){  
    const data = yield fetch('https://demo0945922.mockable.io/');
    console.log(data.json());
}

const returnNextElement = createFlow();
const futureData = returnNextElement.next();

futureData.value.then(doWhenDataReceived);

//privod sinkronosti, ali nema blokiranja thread-a
//u stanju smo se vratiti u execution contekst neke funkcije
//kasnije ce se next() poziv wrapati sa await kljucnom rijeci