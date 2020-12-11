const utils = require('../utils');
let grid = utils.getCharGridInput();

const SEAT_EMTPY = 'L';
const SEAT_OCCUPIED = '#';
const NO_SEAT = '.';
const OCCUPIED_SEATS_THRESHOLD = 4;

let gridsDifferent = true;
let occupiedSeats = 0;

while (gridsDifferent) {
  const newGrid = [];
  occupiedSeats = simulateRound(newGrid);
  gridsDifferent = areGridsDifferent(grid, newGrid);
  grid = newGrid;
}

console.log(occupiedSeats);

function simulateRound(newGrid) {
  let occupiedSeats = 0;
  grid.forEach((seatRow, rowIndex) => {
    newGrid.push([]);
    seatRow.forEach((seat, colIndex) => {
      newGrid[rowIndex][colIndex] = simulateSeat(rowIndex, colIndex);
      if (newGrid[rowIndex][colIndex] === SEAT_OCCUPIED) occupiedSeats++;
    });
  });
  return occupiedSeats;
}

function areGridsDifferent(grid1, grid2) {
  for (let row = 0; row < grid1.length; row++) {
    for (let col = 0; col < grid1[0].length; col++) {
      if (grid1[row][col] !== grid2[row][col]) {
        return true;
      }
    }
  }
  return false;
}

function simulateSeat(row, col) {
  const occNeighbours = countOccupiedNeighbours(row, col);
  if (grid[row][col] === SEAT_EMTPY) {
    if (occNeighbours === 0) return SEAT_OCCUPIED;
  } else if (grid[row][col] === SEAT_OCCUPIED) {
    if (occNeighbours >= OCCUPIED_SEATS_THRESHOLD) return SEAT_EMTPY;
  }
  return grid[row][col];
}

function countOccupiedNeighbours(row, col) {
  const seatsToCheck = [];
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (!(colOffset === 0 && rowOffset === 0)) {
        addIfInRange(seatsToCheck, row + rowOffset, col + colOffset);
      }
    }
  }
  return seatsToCheck.filter((seat) => seat === SEAT_OCCUPIED).length;
}

function addIfInRange(acc, row, col) {
  const rowInRange = row >= 0 && row <= grid.length - 1;
  const colInRange = col >= 0 && col <= grid[0].length - 1;
  if (rowInRange && colInRange) {
    acc.push(grid[row][col]);
  }
}
