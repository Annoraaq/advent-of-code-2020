const utils = require('../utils');
const { findInvalidNo } = require('./day9-utils');
const adapters = utils.getIntInput();

const dp = new Map();
adapters.sort((a, b) => a - b);

const joltageSet = new Set(adapters);


dp.set(adapters[adapters.length - 1], 1);

function getOrZero(map, key) {
  if (!map.has(key)) return 0;
  return map.get(key);
}

for (let i = adapters.length - 2; i >= 0; i--) {
  const diff1 = getOrZero(dp, adapters[i] + 1);
  const diff2 = getOrZero(dp, adapters[i] + 2);
  const diff3 = getOrZero(dp, adapters[i] + 3);
  dp.set(adapters[i], diff1 + diff2 + diff3);
}

const diff1 = getOrZero(dp, 1);
const diff2 = getOrZero(dp, 2);
const diff3 = getOrZero(dp, 3);
dp.set(0, diff1 + diff2 + diff3);

console.log(dp.get(0));
