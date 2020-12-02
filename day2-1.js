const utils = require('./utils');
const lines = utils.getInput();

const validPasswords = lines.map(line => {
  let [times, match, pw] = line.split(' ');
  const [min, max] = times.split('-').map(e => Number(e));
  match = match.substr(0, match.length - 1);
  return { min, max, match, pw };
}).filter(({ min, max, match, pw }) => {
  const occurrences = pw.split(match).length - 1;
  return occurrences >= min && occurrences <= max;
});

console.log('number of valid passwords', validPasswords.length);

