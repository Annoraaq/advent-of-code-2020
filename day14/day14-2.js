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

    const resBinStrings = applyMask(fill36(toBinrayStr(address)), mask);
    resBinStrings.forEach((resBinStr) => {
      mem.set(parseInt(resBinStr, 2), value);
    });
  }
});

const sum = [...mem.values()].reduce((acc, curr) => acc + curr, 0);

console.log(sum);

function applyMask(binStr, mask) {
  let output = '';
  for (let i = 0; i < binStr.length; i++) {
    output += mask[i] !== '0' ? mask[i] : binStr[i];
  }

  let binStrings = [''];
  [...output].forEach(c => {
    if (c !== 'X') {
      binStrings = binStrings.map(binStr => binStr + c);
    } else {
      const zero = binStrings.map(binStr => binStr + '0');
      const one = binStrings.map(binStr => binStr + '1');
      binStrings = [...zero, ...one];
    }
  });

  return binStrings;

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
