const utils = require('./utils');
const boardingPasses = utils.getInput();

const seatIds = getSeatIds(boardingPasses);

console.log(`highest seat ID: ${Math.max(...seatIds)}`);

function getSeatIds(boardingPasses) {
  return boardingPasses.map(pass => {
    const row = binarySearch(0, 127, pass.substr(0, 7));
    const col = binarySearch(0, 7, pass.substr(7, 3));
    return row * 8 + col;
  });
}

function binarySearch(from, till, instructions) {
  [...instructions].forEach(instr => {
    if (instr === "F" || instr === "L") {
      till = Math.floor((from + till) / 2);
    } else {
      from = Math.ceil((from + till) / 2);
    }
  });
  return from;
}
