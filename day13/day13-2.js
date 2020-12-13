const utils = require('../utils');
const lines = utils.getInput();

const busIds = lines[1].split(',').map(busId => busId);

const busIdsWithOffsets = [];
let offset = 0;
busIds.forEach((busId) => {
  if (busId !== 'x') {
    busIdsWithOffsets.push([BigInt(busId), BigInt(offset)]);
  }
  offset++;
});

simulate(busIdsWithOffsets[0][0], BigInt(1));

function simulate(stepSize, checkIndex) {
  let i = stepSize;
  let toCheckId = busIdsWithOffsets[checkIndex][0];
  let toCheckOffset = busIdsWithOffsets[checkIndex][1];
  while (true) {
    if ((i + toCheckOffset) % toCheckId === BigInt(0)) {
      checkIndex++;
      if (checkIndex >= busIdsWithOffsets.length) {
        console.log(i)
        break;
      }
      stepSize = lcm(stepSize, toCheckId);
      toCheckId = busIdsWithOffsets[checkIndex][0];
      toCheckOffset = busIdsWithOffsets[checkIndex][1];
    }
    i += stepSize;
  }
}

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
