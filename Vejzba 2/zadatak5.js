function stvoriIterator(niz) {
  let indeks = 0;

  function iterator() {
    if (indeks < niz.length) {
      let trenutniElement = niz[indeks];
      indeks++;
      return trenutniElement + " je " + indeks + "-ti element niza";
    } else {
      return "Kraj niza";
    }
  }

  return iterator;
}

// Primjer korištenja stvorenog iteratora
let mojNiz = ["a", "b", "c", "d"];
let noviIterator = stvoriIterator(mojNiz);

console.log(noviIterator()); // Output: "a je 1-ti element niza"
console.log(noviIterator()); // Output: "b je 2-ti element niza"
console.log(noviIterator()); // Output: "c je 3-ti element niza"
console.log(noviIterator()); // Output: "d je 4-ti element niza"
console.log(noviIterator()); // Output: "Kraj niza"
