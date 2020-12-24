const utils = require('../utils');
const lines = utils.getInput();
const CMD_SE = 'se';
const CMD_SW = 'sw';
const CMD_NW = 'nw';
const CMD_NE = 'ne';
const CMD_E = 'e';
const CMD_W = 'w';
const longCommands = [CMD_SE, CMD_SW, CMD_NW, CMD_NE];

const commandLines = lines.map(parseLine);
const blackTiles = new Set();

commandLines.map(getCoordinates).forEach(([row, col]) => {
  const strCoord = `${row}#${col}`;
  if (!blackTiles.has(strCoord)) {
    blackTiles.add(strCoord);
  } else {
    blackTiles.delete(strCoord);
  }
});

console.log(blackTiles.size);

function getCoordinates(commands) {
  let row = 0;
  let col = 0;
  commands.forEach(cmd => {
    switch (cmd) {
      case CMD_E:
        col++;
        break;
      case CMD_W:
        col--;
        break;
      case CMD_SE:
        if (row % 2 != 0) col++;
        row++;
        break;
      case CMD_SW:
        if (row % 2 == 0) col--;
        row++;
        break;
      case CMD_NW:
        if (row % 2 == 0) col--;
        row--;
        break;
      case CMD_NE:
        if (row % 2 != 0) col++;
        row--;
        break;
    }
  });
  return [row, col];
}

function parseLine(line) {
  const commands = [];
  let pos = 0;
  while (pos < line.length) {
    const longCommand = line.substr(pos, 2);
    if (longCommands.includes(longCommand)) {
      commands.push(longCommand);
      pos += 2;
    } else {
      commands.push(line[pos]);
      pos++;
    }
  }
  return commands;
}
