const utils = require('../utils');
let commands = utils.getInput().map(
  rawCommand => ({ type: rawCommand[0], arg: Number(rawCommand.substr(1)) })
);

const CMD_NORTH = 'N';
const CMD_SOUTH = 'S';
const CMD_EAST = 'E';
const CMD_WEST = 'W';
const CMD_LEFT = 'L';
const CMD_RIGHT = 'R';
const CMD_FORWARD = 'F';

const DIRECTION_VECTORS = {};
DIRECTION_VECTORS[CMD_NORTH] = { north: 1, east: 0 };
DIRECTION_VECTORS[CMD_SOUTH] = { north: -1, east: 0 };
DIRECTION_VECTORS[CMD_EAST] = { north: 0, east: 1 };
DIRECTION_VECTORS[CMD_WEST] = { north: 0, east: -1 };

let pos = { north: 0, east: 0 };
let dir = 0;
const dirMapping = {
  0: DIRECTION_VECTORS[CMD_EAST],
  90: DIRECTION_VECTORS[CMD_SOUTH],
  180: DIRECTION_VECTORS[CMD_WEST],
  270: DIRECTION_VECTORS[CMD_NORTH],
}

commands.forEach(({ type, arg }) => {
  switch (type) {
    case CMD_NORTH:
    case CMD_SOUTH:
    case CMD_EAST:
    case CMD_WEST:
      pos = posAdd(pos, posMult(DIRECTION_VECTORS[type], arg));
      break;
    case CMD_LEFT:
      dir = updateDir(dir, -arg);
      break;
    case CMD_RIGHT:
      dir = updateDir(dir, arg);
      break;
    case CMD_FORWARD:
      pos = posAdd(pos, posMult(dirMapping[dir], arg));
      break;
  }
});

function posAdd(p1, p2) {
  return { north: p1.north + p2.north, east: p1.east + p2.east };
}

function posMult(pos, mult) {
  return { north: pos.north * mult, east: pos.east * mult };
}

function updateDir(dir, arg) {
  dir += arg;
  dir %= 360;
  if (dir < 0) {
    dir = 360 + dir;
  }
  return dir;
}

function getManhattenDist(pos) {
  return Math.abs(pos.east) + Math.abs(pos.north);
}

console.log(getManhattenDist(pos));
