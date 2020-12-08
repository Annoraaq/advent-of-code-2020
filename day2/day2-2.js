const utils = require('../utils');
const lines = utils.getInput();

function extractValues(line) {
  let [times, match, pw] = line.split(' ');
  const [min, max] = times.split('-').map(e => Number(e));
  match = match.substr(0, match.length - 1);
  return { min, max, match, pw };
}

function matches({ min, max, match, pw }) {
  const isFirstMatch = pw.charAt(min - 1) === match;
  const isSecondMatch = pw.charAt(max - 1) === match;

  return (isFirstMatch && !isSecondMatch) || (!isFirstMatch && isSecondMatch);
}

const validPasswords = lines.map(extractValues).filter(matches);

console.log('number of valid passwords', validPasswords.length);
