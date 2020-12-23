const utils = require('../utils');
const input = utils.getInput()[0];

const TOTAL_MOVES = 100;
const Node = data => ({ data: data, next: null });

const cubs = [...input].map(c => Number(c));

let cub = Node(cubs[0]);
let highestDestLabel = cub.data;
let firstCub = cub;
cubs.forEach((cubData, index) => {
  if (index == 0) return;
  cub.next = Node(cubData);
  cub = cub.next;
  if (index == cubs.length - 1) {
    cub.next = firstCub;
  }
  if (cub.data > highestDestLabel) {
    highestDestLabel = cub.data;
  }
});



function find(currentCub, destinationLabel) {
  if (!isValidDestination(currentCub, destinationLabel)) return undefined;
  let curr = currentCub.next;
  while ((curr.data !== destinationLabel) && (currentCub.data != curr.data)) {
    curr = curr.next;
  }
  if (curr.data == currentCub.data) {
    return undefined;
  }
  return curr;
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
  } while (!destinationCub);

  const pickedUp1 = currentCub.next;
  const pickedUp2 = pickedUp1.next;
  const pickedUp3 = pickedUp2.next;

  currentCub.next = pickedUp3.next;
  pickedUp3.next = destinationCub.next;
  destinationCub.next = pickedUp1;

  currentCub = currentCub.next;
}

printRes(findNodeWithLabel(firstCub, 1));

function findNodeWithLabel(startNode, label) {
  let curr = startNode;
  while (curr.data != label) {
    curr = curr.next;
  }
  return curr;
}

function printRes(firstCub) {
  let curr = firstCub.next;
  let str = '';
  while (true) {
    str += curr.data;
    curr = curr.next;
    if (curr == firstCub) break;
  }

  console.log(str);
}




function isValidDestination(currentCub, destinationCubLabel) {
  if (currentCub.data == destinationCubLabel) return false;
  if (currentCub.next.data == destinationCubLabel) return false;
  if (currentCub.next.next.data == destinationCubLabel) return false;
  if (currentCub.next.next.next.data == destinationCubLabel) return false;
  return true;
}



