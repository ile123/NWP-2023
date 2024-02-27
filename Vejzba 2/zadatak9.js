function createIterator(numbers) {
  const filtered = numbers.filter((num) => num % 2 != 0).sort((a, b) => a - b);
  let final = "";
  let index = 0;
  return {
    next: function () {
      if (index < filtered.length - 1) {
        final += ", " + filtered[index];
        index = index + 1;
        return {
          value: final,
          done: false,
        };
      } else if (index == filtered.length - 1) {
        final += ", " + filtered[index];
        index = index + 1;
        return {
          value: final,
          done: true,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
}

numbers = [17, 34, 3, 12, 23];
iterator = createIterator(numbers);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
