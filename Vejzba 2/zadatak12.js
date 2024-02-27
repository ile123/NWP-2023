function* simulacijaRazgovora(words) {
  let index = 0;
  const interval = setInterval(() => {
    if (index >= words.length) {
      clearInterval(interval);
    } else {
      const currentWord = words[index++];
      if (currentWord === "generator") {
        console.log("hej");
      } else {
        console.log("besmislica");
      }
      yield;
    }
  }, 3000);
}

const conversation = simulacijaRazgovora([
  "generator",
  "ne",
  "generator",
  "test",
  "generator",
]);

const nextStep = () => {
  const { value, done } = conversation.next();
  if (!done) {
    setTimeout(nextStep, 0);
  }
};

nextStep();
