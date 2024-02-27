function blackJack(cards) {
  let dealerCalled = false;
  let playerCalled = false;
  let dealerArgs, playerArgs;
  let dealerSum = cards.reduce((acc, val) => acc + val, 0);

  function dealer(arg1, arg2) {
    if (!dealerCalled) {
      dealerCalled = true;
      return dealerSum;
    } else {
      dealerArgs = [arg1, arg2];
      playerCalled = true;
      return player;
    }
  }

  function player() {
    if (!playerCalled) return "Call dealer first!";
    let sum = dealerArgs[0] + dealerArgs[1] + cards[0];
    if (sum <= 21) {
      dealerArgs = [dealerArgs[1], cards.shift()];
      return sum;
    } else if (sum > 21) {
      playerCalled = false;
      return "bust!";
    } else {
      return "You are done!";
    }
  }

  return dealer;
}

let game = blackJack([4, 7, 9]);
let dealerSum = game();
let playerResult = game(4, 7)();
while (playerResult !== "You are done!") {
  console.log(playerResult);
  playerResult = game()();
}
