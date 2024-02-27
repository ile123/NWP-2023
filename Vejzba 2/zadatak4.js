const sum = (array) => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
};

const array = [1, 2, 3, 4, 5];
console.log(sum(array));
