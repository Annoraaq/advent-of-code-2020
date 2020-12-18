const utils = require('../utils');
const lines = utils.getInput();
let pos = 0;

console.log(lines.reduce((acc, curr) => acc + calcLine(curr), 0));

function calcLine(line) {
  pos = 0;
  return calc(0, line);
}

function calc(startVal, line, noBracketMode) {
  let currNum = startVal;
  while (pos < line.length) {
    if (/[0-9]/g.test(line[pos])) {
      currNum = Number(line[pos]);
      pos++;
    } else if (line[pos] == ')') {
      if (!noBracketMode) pos++;
      break;
    } else if (line.substr(pos, 4) == ' + (') {
      pos += 4;
      currNum += calc(0, line);
    } else if (line.substr(pos, 4) == ' * (') {
      pos += 4;
      currNum *= calc(calc(0, line), line, true);
    } else if (line.substr(pos, 3) == ' + ') {
      currNum += Number(line[pos + 3]);
      pos += 4;
    } else if (line.substr(pos, 3) == ' * ') {
      pos += 3;
      currNum *= calc(0, line, true);
    } else {
      pos++;
      currNum = calc(0, line);
    }
  }
  return currNum;
}
