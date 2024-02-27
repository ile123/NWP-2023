const numSelectString = (array) => {
  return array
    .filter((number) => number % 2 != 0)
    .sort((a, b) => a - b)
    .reduce((acc, curr, index) => {
      if (index === 0) {
        return `${curr}`;
      } else {
        return `${acc}, ${curr}`;
      }
    }, "");
};

console.log(numSelectString([17, 34, 3, 12, 23]));
