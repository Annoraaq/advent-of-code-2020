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

const z = getZ();
simulate(busIdsWithOffsets[0][0], BigInt(1), getZ());

function getZ() {
  const z = new Map();
  for (let i = 1; i < busIdsWithOffsets.length; i++) {
    const [busId, offset] = busIdsWithOffsets[i];
    if (busId !== busIdsWithOffsets[0][0]) {
      let counter = busIdsWithOffsets[0][0];
      let firstEncounter = BigInt(-1);
      let secondEncounter = BigInt(-1);
      while (counter < BigInt(1000000)) {
        if (((counter + offset) % busId === BigInt(0))) {
          if (firstEncounter === BigInt(-1)) {
            firstEncounter = counter;
          } else {
            secondEncounter = counter;
            z.set(busId, (secondEncounter - firstEncounter));
            break;
          }
        }
        counter += busIdsWithOffsets[0][0];
      }
    }
  }
  return z;
}

function simulate(stepSize, checkIndex, z) {
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
      stepSize = lcm(stepSize, z.get(toCheckId));
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
