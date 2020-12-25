const cardPublicKey = 10604480;
const doorPublicKey = 4126658;
const subject = 7;

const cardLoopSize = findLoopSize(subject, cardPublicKey);
const doorLoopSize = findLoopSize(subject, doorPublicKey);

const encKey = transform(doorPublicKey, cardLoopSize);

console.log(encKey);

function findLoopSize(subject, wanted) {
  let curr = 1;
  let currLoopSize = 1;
  while (true) {
    curr *= subject;
    curr = curr % 20201227;
    if (curr == wanted) {
      return currLoopSize;
    }
    currLoopSize++;
  }
  return curr;
}

function transform(subject, loopSize) {
  let curr = 1;
  for (let i = 0; i < loopSize; i++) {
    curr *= subject;
    curr = curr % 20201227;
  }
  return curr;
}

