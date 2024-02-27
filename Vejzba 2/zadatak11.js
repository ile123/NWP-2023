function* wordGenerator(str) {
  const words = str.split(",");

  for (const word of words) {
    yield word;
  }
}

const myString = "Koko,je,dobra,pticica";
const iterator = wordGenerator(myString);

for (const word of iterator) {
  console.log(word);
}
