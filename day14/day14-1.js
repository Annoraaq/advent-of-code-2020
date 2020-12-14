const utils = require('../utils');
const lines = utils.getInput();

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const mem = new Map();

lines.map(line => {
  if (line.startsWith('mask = ')) {
    mask = line.substr('mask = '.length);
  } else {
    const address = Number(line.substr(0, line.indexOf(']')).substr('mem['.length));
    const value = Number(line.substr(line.indexOf('= ') + 2));
    const resBinStr = applyMask(fill36(toBinrayStr(value)), mask);
    mem.set(address, parseInt(resBinStr, 2));
  }
});

const sum = [...mem.values()].reduce((acc, curr) => acc + curr, 0);

console.log(sum);

function applyMask(binStr, mask) {
  let output = '';
  for (let i = 0; i < binStr.length; i++) {
    output += mask[i] === 'X' ? binStr[i] : mask[i];
  }
  return output;
}

function toBinrayStr(dec) {
  return dec.toString(2);
}

function fill36(value) {
  let newVal = value;
  for (let i = 0; i < (36 - value.length); i++) {
    newVal = '0' + newVal;
  }
  return newVal;
}
