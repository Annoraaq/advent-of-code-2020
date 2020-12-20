const utils = require('../utils');
const lines = utils.getRawInput().split('\n');

const blocks = parseBlocks(lines);
const matches = createMatches(blocks);

const corners = getCorners(matches);
const grid = createGrid(corners);

const largeBlock = createLargeBlock(grid);

const pattern = ['                  # ', '#    ##    ##    ###', ' #  #  #  #  #  #   '];

console.log('roughness', getRoughness(largeBlock, pattern));

function getCorners(matches) {
  const corners = [];
  matches.forEach((matchIds, sourceId) => {
    if (matchIds.size == 2) {
      corners.push(sourceId);
    }
  });
  return corners;
}


function fillTopLeftCorner(grid, corners) {
  const topLeftCorner = blocks.get(corners[0]);
  let topMatches = true;
  let leftMatches = true;
  while (topMatches || leftMatches) {
    rotateLeft(topLeftCorner);
    const [top, _bottom, left, _right] = getSides(topLeftCorner);
    topMatches = [...blocks.values()].filter(block => block.id !== topLeftCorner.id).some(block => {
      return getSidesWithReverse(block).some(side => side.join('') == top.join(''))
    });
    leftMatches = [...blocks.values()].filter(block => block.id !== topLeftCorner.id).some(block => {
      return getSidesWithReverse(block).some(side => side.join('') == left.join(''))
    });
  }
  grid[0][0] = topLeftCorner;
}

function createGrid(corners) {
  const grid = [];
  const sideLength = Math.sqrt(blocks.size);
  for (let i = 0; i < sideLength; i++) {
    grid.push([]);
    for (let j = 0; j < sideLength; j++) {
      grid[i].push(undefined);
    }
  }

  fillTopLeftCorner(grid, corners);

  for (let row = 0; row < sideLength; row++) {
    for (let col = 0; col < sideLength; col++) {
      // skip top left corner
      if (row == 0 && col == 0) continue;
      if (row == 0) {
        const matching = findMatchingLeft(grid, row, col);
        rotateUntilFits(matching, row, col, grid);
        grid[row][col] = matching;
      } else {
        const matching = findMatchingTop(grid, row, col);
        rotateUntilFits(matching, row, col, grid);
        grid[row][col] = matching;
      }
    }
  }
  return grid;
}

function findMatchingLeft(grid, row, col) {
  const leftNeighbourSide = getSides(grid[row][col - 1])[3];
  const otherBlocks = [...blocks.values()].filter(block => block.id !== grid[row][col - 1].id);
  const matching = otherBlocks.filter(
    block => matchesBorder(leftNeighbourSide, block)
  );
  return matching[0];
}

function findMatchingTop(grid, row, col) {
  const topNeighbourSide = getSides(grid[row - 1][col])[1];
  const otherBlocks = [...blocks.values()].filter(block => block.id !== grid[row - 1][col].id);
  const matching = otherBlocks.filter(
    block => matchesBorder(topNeighbourSide, block)
  );
  return matching[0];
}

function rotateUntil(block, matchFn) {
  let matches = false;
  let flipped = false;
  let rotations = 0;
  while (!matches && rotations < 5) {
    rotateLeft(block);
    matches = matchFn(block);
    rotations++;
    if (rotations >= 5 && !flipped) {
      flip(block);
      flipped = true;
      rotations = 0;
    }
  }
}

function getRoughness(block, pattern) {
  rotateUntil(block, (block) => { return matchesPattern(block, pattern) });
  const noMatches = matchesPattern(largeBlock, pattern);
  const totalRoughness = countRoughness(largeBlock);
  let patternRoughness = 0;
  pattern.forEach(line => [...line].forEach(el => {
    if (el == '#') patternRoughness++;
  }));
  return totalRoughness - patternRoughness * noMatches;
}

function countRoughness(block) {
  let count = 0;
  block.lines.forEach(line => line.forEach(el => {
    if (el == '#') count++;
  }));
  return count;
}


function matchesPattern(block, pattern) {
  let count = 0;
  for (let row = 0; row < block.lines.length - pattern.length; row++) {
    for (let col = 0; col < block.lines[0].length - pattern[0].length; col++) {
      if (matchesPatternAt(block, row, col, pattern)) count++;
    }
  }
  return count;
}

function matchesPatternAt(block, startRow, startCol, pattern) {
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[0].length; col++) {
      if (pattern[row][col] == '#' && block.lines[row + startRow][col + startCol] !== '#') {
        return false;
      }
    }
  }
  return true;
}

function createLargeBlock(grid) {
  const block = { id: 'global', lines: [] };
  for (let row = 0; row < grid.length; row++) {
    for (let innerRow = 1; innerRow < grid[row][0].lines.length - 1; innerRow++) {
      let line = [];
      for (let col = 0; col < grid.length; col++) {
        for (let innerCol = 1; innerCol < grid[row][col].lines.length - 1; innerCol++) {
          line.push(grid[row][col].lines[innerRow][innerCol]);
        }
      }
      block.lines.push(line);
    }
  }
  return block;
}

function matchesBorder(border, block) {
  return getSidesWithReverse(block).some(side => side.join('') == border.join(''));
}

function rotateUntilFits(block, row, col, grid) {
  if (row == 0) {
    const leftNeighbourSide = getSides(grid[row][col - 1])[3];
    rotateUntil(block, (block) => {
      const [_top, _bottom, left, _right] = getSides(block);
      return left.join('') == leftNeighbourSide.join('');
    });
  } else if (col == 0) {
    const topNeighbourSide = getSides(grid[row - 1][col])[1];
    rotateUntil(block, (block) => {
      const [top, _bottom, _left, _right] = getSides(block);
      return top.join('') == topNeighbourSide.join('');
    });
  } else {
    const leftNeighbourSide = getSides(grid[row][col - 1])[3];
    const topNeighbourSide = getSides(grid[row - 1][col])[1];
    rotateUntil(block, (block) => {
      const [top, _bottom, left, _right] = getSides(block);
      return top.join('') == topNeighbourSide.join('') && left.join('') == leftNeighbourSide.join('');
    });
  }
}

function rotateLeft(block) {
  const newBlock = [];
  const rows = block.lines.length;
  for (let row = 0; row < rows; row++) {
    newBlock.push([]);
  }
  for (let col = 0; col < rows; col++) {
    for (let row = 0; row < rows; row++) {
      newBlock[rows - col - 1][row] = block.lines[row][col];
    }
  }
  block.lines = newBlock;
}

function flip(block) {
  const newBlock = [];
  const rows = block.lines.length;
  for (let row = 0; row < rows; row++) {
    newBlock.push([]);
  }
  for (let col = 0; col < rows; col++) {
    for (let row = 0; row < rows; row++) {
      newBlock[col][row] = block.lines[row][col];
    }
  }
  block.lines = newBlock;
}

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
  if (block1.id == block2.id) return false;
  const sides1 = getSidesWithReverse(block1);
  const sides2 = getSidesWithReverse(block2);
  return sides1.some(side1 => sides2.some(side2 => side1.join('') === side2.join('')));
}

function getSidesWithReverse(block) {
  const sides = getSides(block);
  const allSides = [];
  sides.forEach(side => {
    allSides.push(side);
    allSides.push([...side].reverse());
  });
  return allSides;
}

function getSides(block) {
  const top = block.lines[0];
  const bottom = block.lines[block.lines.length - 1];
  const left = [];
  const right = [];
  block.lines.forEach(line => {
    left.push(line[0]);
    right.push(line[line.length - 1]);
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
      block.lines.push([...line]);
    }
  });
  return blocks;
}
