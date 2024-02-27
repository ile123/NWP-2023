const fakePeople = [
  { name: "Ivo", hasPets: false },
  { name: "Eva", hasPets: true },
  { name: "Marko", hasPets: true },
];

function fakeAPICall(i) {
  return new Promise((resolve, reject) => {
    if (i >= fakePeople.length) {
      reject("Broj veći od indeksa osoba!");
    } else {
      const randomTime = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
      setTimeout(() => {
        resolve(fakePeople[i]);
      }, randomTime);
    }
  });
}

function getAllData(i) {
  if (i > 3) {
    return Promise.reject("Broj veći od 3!");
  } else {
    const promises = [];
    for (let j = 0; j < 3; j++) {
      promises.push(fakeAPICall(j));
    }
    return Promise.all(promises);
  }
}

const i = 2;
getAllData(i)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
