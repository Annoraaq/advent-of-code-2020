const utils = require('./utils');
const lines = utils.getInput();

const map = [];
lines.forEach(lineStr => map.push([...lineStr]));

const steps = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

console.log(steps.map(countTrees).reduce((acc, curr) => acc * curr));

function countTrees([stepX, stepY]) {
  let y = 0;
  let x = 0;
  let trees = 0;

  while (y < map.length - 1) {
    x += stepX;
    x %= map[0].length;
    y += stepY;

    if (map[y][x] == '#') trees++;
  }

  return trees;
}
