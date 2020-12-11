const utils = require('../utils');
let grid = utils.getCharGridInput();

const SEAT_EMTPY = 'L';
const SEAT_OCCUPIED = '#';
const NO_SEAT = '.';
const OCCUPIED_SEATS_THRESHOLD = 5;

let gridsDifferent = true;
let occupiedSeats = 0;

const DIRECTIONS = {
  top: 0,
  topRight: 1,
  right: 2,
  bottomRight: 3,
  bottom: 4,
  bottomLeft: 5,
  left: 6,
  topLeft: 7
};

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

function countOccupiedNeighbours(row, col, debug) {
  const seatsToCheck = [];

  Object.values(DIRECTIONS).forEach(direction => {
    discoverNextSeat(seatsToCheck, direction, row, col);
  });

  return seatsToCheck.filter((seat) => seat === SEAT_OCCUPIED).length;
}

function discoverNextSeat(seatsToCheck, direction, row, col) {
  for (let offset = 1; offset <= grid.length; offset++) {
    let seatFound = false;
    switch (direction) {
      case DIRECTIONS.top:
        seatFound = addIfInRange(seatsToCheck, row - offset, col);
        break;
      case DIRECTIONS.bottom:
        seatFound = addIfInRange(seatsToCheck, row + offset, col);
        break;
      case DIRECTIONS.left:
        seatFound = addIfInRange(seatsToCheck, row, col - offset);
        break;
      case DIRECTIONS.right:
        seatFound = addIfInRange(seatsToCheck, row, col + offset);
        break;
      case DIRECTIONS.topLeft:
        seatFound = addIfInRange(seatsToCheck, row - offset, col - offset);
        break;
      case DIRECTIONS.topRight:
        seatFound = addIfInRange(seatsToCheck, row - offset, col + offset);
        break;
      case DIRECTIONS.bottomLeft:
        seatFound = addIfInRange(seatsToCheck, row + offset, col - offset);
        break;
      case DIRECTIONS.bottomRight:
        seatFound = addIfInRange(seatsToCheck, row + offset, col + offset);
        break;
    }
    if (seatFound) return true;
  }

}

function addIfInRange(acc, row, col) {
  const rowInRange = row >= 0 && row <= grid.length - 1;
  const colInRange = col >= 0 && col <= grid[0].length - 1;
  if (rowInRange && colInRange && grid[row][col] !== NO_SEAT) {
    acc.push(grid[row][col]);
    return true;
  }
  return false;
}

