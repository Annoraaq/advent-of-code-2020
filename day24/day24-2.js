const { count } = require('console');
const utils = require('../utils');
const lines = utils.getInput();
const CMD_SE = 'se';
const CMD_SW = 'sw';
const CMD_NW = 'nw';
const CMD_NE = 'ne';
const CMD_E = 'e';
const CMD_W = 'w';
const longCommands = [CMD_SE, CMD_SW, CMD_NW, CMD_NE];
const SIM_STEPS = 100;

const commandLines = lines.map(parseLine);
let blackTiles = new Set();
walkTiles(blackTiles, commandLines);

for (let i = 0; i < SIM_STEPS; i++) {
  const checkedTiles = new Set();
  const newBlackTiles = new Set();
  blackTiles.forEach(tileStr => {
    const [row, col] = tileStr.split('#').map(e => Number(e));
    simulateTile(checkedTiles, blackTiles, newBlackTiles, row, col);
  });
  blackTiles = newBlackTiles;

  console.log(`Day ${i + 1}: ${blackTiles.size}`);
}


function simulateTile(checkedTiles, blackTiles, newBlackTiles, row, col) {
  if (checkedTiles.has(`${row}#${col}`)) return;
  checkedTiles.add(`${row}#${col}`);
  const neighbours = countNeighbours(blackTiles, row, col);
  if (blackTiles.has(`${row}#${col}`)) {
    if (neighbours > 0 && neighbours <= 2) {
      newBlackTiles.add(`${row}#${col}`);
    }
    getNeighbouringCoords(row, col).forEach(([r, c]) => {
      simulateTile(checkedTiles, blackTiles, newBlackTiles, r, c)
    });
  } else {
    if (neighbours == 2) {
      newBlackTiles.add(`${row}#${col}`);
    }
  }
}

function getNeighbouringCoords(row, col) {
  if (row % 2 == 0) {
    return [
      [row, col - 1],
      [row, col + 1],
      [row - 1, col],
      [row + 1, col],
      [row - 1, col - 1],
      [row + 1, col - 1],
    ]
  }
  return [
    [row, col - 1],
    [row, col + 1],
    [row - 1, col],
    [row + 1, col],
    [row - 1, col + 1],
    [row + 1, col + 1],
  ]
}

function countNeighbours(blackTiles, row, col) {
  return getNeighbouringCoords(row, col).filter(([r, c]) => blackTiles.has(`${r}#${c}`)).length
}

function walkTiles(blackTiles, commandLines) {
  commandLines.map(getCoordinates).forEach(([row, col]) => {
    const strCoord = `${row}#${col}`;
    if (!blackTiles.has(strCoord)) {
      blackTiles.add(strCoord);
    } else {
      blackTiles.delete(strCoord);
    }
  });
}

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
