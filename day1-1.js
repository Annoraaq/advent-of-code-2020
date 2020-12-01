const utils = require('./utils');
const input = utils.getIntInput();

for (let l1 of input) {
  for (let l2 of input) {
    if (l1 + l2 == 2020) {
      console.log(`${l1} * ${l2} = ${l1 * l2}`);
    }
  }
}
