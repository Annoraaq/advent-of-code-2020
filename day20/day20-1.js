const utils = require('../utils');
const lines = utils.getRawInput().split('\n');

const blocks = parseBlocks(lines);
const matches = createMatches(blocks);

const corners = [];
matches.forEach((matchIds, sourceId) => {
  if (matchIds.size == 3) {
    corners.push(sourceId);
  }
});

const res = corners.reduce((acc, curr) => acc * curr, 1);

console.log(res);

function createMatches(blocks) {
  const matches = new Map();
  blocks.forEach(b1 => {
    if (!matches.has(b1.id)) {
      matches.set(b1.id, new Set());
    }
    blocks.forEach(b2 => {
      if (doMatch(b1, b2)) {
        matches.get(b1.id).add(b2.id);
      }
    });
  });
  return matches;
}

function doMatch(block1, block2) {
  const sides1 = getSidesWithReverse(block1);
  const sides2 = getSidesWithReverse(block2);
  return sides1.some(side1 => sides2.includes(side1));
}

function reverseStr(str) {
  return str.split("").reverse().join('');
}

function getSidesWithReverse(block) {
  const sides = getSides(block);
  const allSides = [];
  sides.forEach(side => {
    allSides.push(side);
    allSides.push(reverseStr(side));
  });
  return allSides;
}

function getSides(block) {
  const top = block.lines[0];
  const bottom = block.lines[block.lines.length - 1];
  let left = '';
  let right = '';
  block.lines.forEach(line => {
    left += line[0];
    right += line[line.length - 1];
  });
  return [top, bottom, left, right];
}

function parseBlocks(lines) {
  const blocks = new Map();
  let block = { id: '', lines: [] };
  lines.forEach(line => {
    if (line.startsWith('Tile')) {
      block.id = Number(line.substr('Tile '.length, 4));
    } else if (line == '') {
      blocks.set(block.id, block);
      block = { id: '', lines: [] };
    } else {
      block.lines.push(line);
    }
  });
  return blocks;
}
