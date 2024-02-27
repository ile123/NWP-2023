const myPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Resolved");
  }, 1000);
});

function printResolved(result) {
  console.log(result);
}

myPromise.then(printResolved);
