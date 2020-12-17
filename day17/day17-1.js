const utils = require('../utils');
const startSlice = utils.getRawInput().split('\n').map(line => [...line]);

const MAX_STEPS = 6;

let cube = new Set();

startSlice.forEach((row, rowIndex) => {
  row.forEach((elem, colIndex) => {
    if (elem == '#') {
      cube.add([colIndex, rowIndex, 0].toString());
    }
  })
});

for (let step = 1; step <= MAX_STEPS; step++) {
  let nextCube = new Set();
  cube.forEach((elem) => {
    const [x, y, z] = elem.split(',').map(e => Number(e));
    simulateElements(cube, nextCube, x, y, z);
  })
  cube = nextCube;
}


console.log(cube.size);

function simulateElements(cube, nextCube, x, y, z) {
  for (let xOff = -1; xOff <= 1; xOff++) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      for (let zOff = -1; zOff <= 1; zOff++) {
        simulateElement(cube, nextCube, x + xOff, y + yOff, z + zOff);
      }
    }
  }
}

function simulateElement(cube, nextCube, x, y, z) {
  const stringPos = [x, y, z].toString();
  const activeNeighbours = countNeighbours(cube, x, y, z);
  if (cube.has(stringPos) && (activeNeighbours == 2 || activeNeighbours == 3)) {
    nextCube.add(stringPos);
  } else if (!cube.has(stringPos) && activeNeighbours === 3) {
    nextCube.add(stringPos);
  }
}

function countNeighbours(cube, x, y, z) {
  let count = 0;
  for (let xOff = -1; xOff <= 1; xOff++) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      for (let zOff = -1; zOff <= 1; zOff++) {
        if (!(xOff === yOff && yOff === zOff && xOff === 0)) {
          if (cube.has([x + xOff, y + yOff, z + zOff].toString())) count++;
        }
      }
    }
  }
  // console.log('neigbours of ', x, y, z, ' = ', count)
  return count;
}


