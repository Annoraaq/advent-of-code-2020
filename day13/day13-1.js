const utils = require('../utils');
const lines = utils.getInput();

const earliestDepartmentTs = Number(lines[0]);
const busIds = lines[1].split(',').filter(busId => busId != 'x').map(busId => Number(busId));

let shortestWaitingTime = Number.MAX_VALUE;
let busIdWithShortestWaitingTime = NaN;
busIds.map(busId => {
  const arrivalTime = earliestDepartmentTs - (earliestDepartmentTs % busId) + busId;
  const waitingTime = arrivalTime - earliestDepartmentTs;
  if (waitingTime < shortestWaitingTime) {
    shortestWaitingTime = waitingTime;
    busIdWithShortestWaitingTime = busId;
  }
});

console.log(shortestWaitingTime * busIdWithShortestWaitingTime);
