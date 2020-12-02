const utils = require('./utils');
const lines = utils.getInput();

const validPasswords = lines.map(line => {
  let [times, match, pw] = line.split(' ');
  const [firstPos, secondPos] = times.split('-').map(e => Number(e));
  match = match.substr(0, match.length - 1);
  return { firstPos, secondPos, match, pw };
}).filter(({ firstPos, secondPos, match, pw }) => {
  const isFirstMatch = pw.charAt(firstPos - 1) === match;
  const isSecondMatch = pw.charAt(secondPos - 1) === match;

  return (isFirstMatch && !isSecondMatch) || (!isFirstMatch && isSecondMatch);
});

console.log('number of valid passwords', validPasswords.length);

