const utils = require('../utils');
const lines = utils.getIntInput();
const { findInvalidNo } = require('./day9-utils');

const PREAMBLE_LEN = 25;
let invalidNo = findInvalidNo(PREAMBLE_LEN, lines);

const range = findRange();
if (range) {
  const [from, till] = range;
  const resultSeq = lines.slice(from, till);
  const min = Math.min(...resultSeq);
  const max = Math.max(...resultSeq);
  console.log(`Matching sequence: [${from}, ${till}]`);
  console.log(`min+max = ${min + max}`);
} else {
  console.log('No matching sequence found');
}

function findRange() {
  for (let i = 0; i < lines.length; i++) {
    let currentSum = 0;
    for (let j = i; j < lines.length; j++) {
      currentSum += lines[j];
      if (currentSum === invalidNo) {
        return [i, j];
      }
    }
  }
}

