const utils = require('../utils');
const { findInvalidNo } = require('./day9-utils');
const adapters = utils.getIntInput();

adapters.sort((a, b) => a - b);

// const max = Math.max(...joltages);
let diff1Count = 0;
let diff3Count = 1;
let currentVal = 0;

adapters.forEach(adapter => {
  if (adapter - currentVal === 1) {
    diff1Count++;
  } else if (adapter - currentVal == 3) {
    diff3Count++;
  }
  currentVal = adapter;
})


console.log(diff1Count * diff3Count);
