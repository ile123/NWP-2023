const myRejectedPromise = new Promise((resolve, reject) => {
  reject("Rejected");
});

function printError(error) {
  console.log(error);
}

myRejectedPromise.catch(printError);
