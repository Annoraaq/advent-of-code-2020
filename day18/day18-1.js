const utils = require('../utils');
const lines = utils.getInput();
let pos = 0;

console.log(lines.reduce((acc, curr) => acc + calcLine(curr), 0));

function calcLine(line) {
  pos = 0;
  return calc(line);
}

function calc(line) {
  let currNum = 0;
  while (pos < line.length) {
    if (/[0-9]/g.test(line[pos])) {
      currNum = Number(line[pos]);
      pos++;
    } else if (line[pos] == ')') {
      pos++;
      break;
    } else if (line.substr(pos, 4) == ' + (') {
      pos += 4;
      const calcLine = calc(line);
      currNum += calcLine;
    } else if (line.substr(pos, 4) == ' * (') {
      pos += 4;
      const calcLine = calc(line);
      currNum *= calcLine;
    } else if (line.substr(pos, 3) == ' + ') {
      currNum += Number(line[pos + 3]);
      pos += 4;
    } else if (line.substr(pos, 3) == ' * ') {
      currNum *= Number(line[pos + 3]);
      pos += 4;
    } else {
      pos++;
      currNum = calc(line);
    }
  }
  return currNum;
}
