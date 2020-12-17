const utils = require('../utils');
const startSlice = utils.getRawInput().split('\n').map(line => [...line]);

const MAX_STEPS = 6;

let cube = new Set();
let checkedFields = new Set();

startSlice.forEach((row, rowIndex) => {
  row.forEach((elem, colIndex) => {
    if (elem == '#') {
      cube.add([colIndex, rowIndex, 0, 0].toString());
    }
  })
});

for (let step = 1; step <= MAX_STEPS; step++) {
  checkedFields = new Set();
  let nextCube = new Set();
  cube.forEach((elem) => {
    const [x, y, z, w] = elem.split(',').map(e => Number(e));
    simulateElements(cube, nextCube, x, y, z, w);
  })
  cube = nextCube;
}

console.log(cube.size);

function simulateElements(cube, nextCube, x, y, z, w) {
  for (let xOff = -1; xOff <= 1; xOff++) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      for (let zOff = -1; zOff <= 1; zOff++) {
        for (let wOff = -1; wOff <= 1; wOff++) {
          const strPos = [x + xOff, y + yOff, z + zOff, w + wOff].toString();
          if (!checkedFields.has(strPos)) {
            simulateElement(cube, nextCube, x + xOff, y + yOff, z + zOff, w + wOff);
            checkedFields.add(strPos);
          }
        }
      }
    }
  }
}

function simulateElement(cube, nextCube, x, y, z, w) {
  const stringPos = [x, y, z, w].toString();
  const activeNeighbours = countNeighbours(cube, x, y, z, w);
  if (cube.has(stringPos) && (activeNeighbours == 2 || activeNeighbours == 3)) {
    nextCube.add(stringPos);
  } else if (!cube.has(stringPos) && activeNeighbours === 3) {
    nextCube.add(stringPos);
  }
}

function countNeighbours(cube, x, y, z, w) {
  let count = 0;
  for (let xOff = -1; xOff <= 1; xOff++) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      for (let zOff = -1; zOff <= 1; zOff++) {
        for (let wOff = -1; wOff <= 1; wOff++) {
          if (!(wOff === xOff && xOff === yOff && yOff === zOff && xOff === 0)) {
            if (cube.has([x + xOff, y + yOff, z + zOff, w + wOff].toString())) count++;
          }
        }
      }
    }
  }
  return count;
}


