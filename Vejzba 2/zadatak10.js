function wordIterator(str) {
  const words = str.split(",");
  let index = 0;
  return {
    next: () => {
      if (index < words.length) {
        return {
          value: words[index++],
          done: false,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
}

const myString = "Koko,je,dobra,pticica";
const iterator = wordIterator(myString);

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
