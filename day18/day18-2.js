const utils = require('../utils');
const lines = utils.getInput();
let pos = 0;
let depth = 0;

console.log(lines.reduce((acc, curr) => acc + calcLine(curr), 0));

function calcLine(line) {
  line.replace("+", "*");
  pos = 0;
  return calc(0, line);
}

function calc(startVal, line, noBracketMode) {
  depth++;
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
      const calcLine = calc(0, line);
      currNum += calcLine;
    } else if (line.substr(pos, 4) == ' * (') {
      pos += 4;
      const calcLine = calc(0, line);
      currNum *= calc(calcLine, line, true);
    } else if (line.substr(pos, 3) == ' + ') {
      currNum += Number(line[pos + 3]);
      pos += 4;
    } else if (line.substr(pos, 3) == ' * ') {
      pos += 3;
      const calcLine = calc(0, line, true);
      currNum *= calcLine;
    } else {
      pos++;
      currNum = calc(0, line);
    }
  }
  depth--;
  return currNum;
}
