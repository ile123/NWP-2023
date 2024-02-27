function doAfter(n, callback) {
  function after() {
    console.log("After Function");
  }
  for (let i = 0; i < n; i++) {
    after();
  }
  callback();
}

function finishedAfter() {
  console.log("Done");
}

doAfter(5, finishedAfter);
