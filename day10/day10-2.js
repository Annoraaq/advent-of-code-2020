const utils = require('../utils');
const adapters = utils.getIntInput();

adapters.sort((a, b) => a - b);

const dp = new Map();
dp.set(adapters[adapters.length - 1], 1);

for (let i = adapters.length - 2; i >= 0; i--) {
  setDpEntry(adapters[i]);
}

setDpEntry(0);

console.log(dp.get(0));

function getOrZero(map, key) {
  if (!map.has(key)) return 0;
  return map.get(key);
}

function setDpEntry(index) {
  const diff1 = getOrZero(dp, index + 1);
  const diff2 = getOrZero(dp, index + 2);
  const diff3 = getOrZero(dp, index + 3);
  dp.set(index, diff1 + diff2 + diff3);
}
