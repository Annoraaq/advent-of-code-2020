const utils = require('../utils');
const input = utils.getInput()[0];

const TOTAL_MOVES = 10000000;
const Node = data => ({ data: data, next: null });

const cubs = [...input].map(c => Number(c));
const cubMap = new Map();

let cub = Node(cubs[0]);
let highestDestLabel = cub.data;
let firstCub = cub;
cubMap.set(cub.data, cub);

cubs.forEach((cubData, index) => {
  if (index == 0) return;
  cub.next = Node(cubData);
  cub = cub.next;
  cubMap.set(cub.data, cub);
  if (cub.data > highestDestLabel) {
    highestDestLabel = cub.data;
  }
});

while (highestDestLabel < 1000000) {
  highestDestLabel++;
  cub.next = Node(highestDestLabel);
  cub = cub.next;
  cubMap.set(cub.data, cub);
  if (highestDestLabel == 1000000) {
    cub.next = firstCub;
  }
}

function find(currentCub, destinationLabel) {
  if (!isValidDestination(currentCub, destinationLabel)) return undefined;
  return cubMap.get(destinationLabel);
}

let currentCub = firstCub;
for (let i = 0; i < TOTAL_MOVES; i++) {
  let destinationLabel = currentCub.data;
  let destinationCub = undefined;
  do {
    destinationLabel--;
    if (destinationLabel < 0) {
      destinationLabel = highestDestLabel;
    }
    destinationCub = find(currentCub, destinationLabel);
  } while (destinationCub === undefined);

  const pickedUp1 = currentCub.next;
  const pickedUp2 = pickedUp1.next;
  const pickedUp3 = pickedUp2.next;

  currentCub.next = pickedUp3.next;
  pickedUp3.next = destinationCub.next;
  destinationCub.next = pickedUp1;

  currentCub = currentCub.next;
}

const oneNode = cubMap.get(1);
console.log(oneNode.next.data * oneNode.next.next.data)

function isValidDestination(currentCub, destinationCubLabel) {
  if (currentCub.data == destinationCubLabel) return false;
  if (currentCub.next.data == destinationCubLabel) return false;
  if (currentCub.next.next.data == destinationCubLabel) return false;
  if (currentCub.next.next.next.data == destinationCubLabel) return false;
  return true;
}
