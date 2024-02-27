function russianRoulette(n) {
  let count = 0;

  function game() {
    count++;
    if (count < n) {
      return "click!";
    } else if (count === n) {
      return "bang";
    } else {
      return "reload to play again";
    }
  }

  return game;
}

let rouletteGame = russianRoulette(5);

console.log(rouletteGame());
console.log(rouletteGame());
console.log(rouletteGame());
console.log(rouletteGame());
console.log(rouletteGame());
console.log(rouletteGame());
console.log(rouletteGame());
