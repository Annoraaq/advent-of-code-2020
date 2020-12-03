const utils = require('./utils');
const lines = utils.getInput();

const map = [];
lines.forEach(lineStr => map.push([...lineStr]));

console.log(countTrees([3, 1]));

function countTrees([stepX, stepY]) {
  let y = 0;
  let x = 0;
  let trees = 0;

  while (y + stepY < map.length) {
    x += stepX;
    x %= map[0].length;
    y += stepY;

    if (map[y][x] == '#') trees++;
  }

  return trees;
}
