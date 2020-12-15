const utils = require('../utils');
const startingNumbers = utils.getInput()[0].split(',').map(num => Number(num));
// enable for part 1
// const LAST_ROUND = 2020;
const LAST_ROUND = 30000000;

const lastSpoken = new Map();
startingNumbers.forEach((num, index) => {
  lastSpoken.set(num, [index + 1]);
});

let spokenLastRound = startingNumbers[startingNumbers.length - 1];
let round = startingNumbers.length + 1;

while (round <= LAST_ROUND) {
  const [r1, r2] = lastSpoken.get(spokenLastRound);
  if (r1 == undefined || r2 == undefined) {
    spokenLastRound = 0;
    updateLastSpoken(spokenLastRound, round);
  } else {
    spokenLastRound = r1 - r2;
    updateLastSpoken(spokenLastRound, round);
  }
  round++;
}

console.log(spokenLastRound);

function updateLastSpoken(index, round) {
  if (!lastSpoken.has(index)) {
    lastSpoken.set(index, [round]);
  } else {
    const [r1, r2] = lastSpoken.get(index);
    lastSpoken.set(index, [round, r1]);
  }
}

