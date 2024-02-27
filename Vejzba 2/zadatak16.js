const myPromise = new Promise((resolve) => {
  resolve("Promise has been resolved!");
});

myPromise.then(() => console.log("Promise has been resolved!"));

console.log("I'm not the promise!");
