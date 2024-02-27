function* stvoriIterator(niz) {
  for (let i = 0; i < niz.length; i++) {
    yield [niz[i], i];
  }
  return "Kraj niza";
}

// Primjer korištenja generatora
let mojNiz = ["a", "b", "c", "d"];
let iterator = stvoriIterator(mojNiz);

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
