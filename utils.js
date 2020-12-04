const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('/dev/stdin').toString().split('\n').filter(line => line !== '');
}

const getRawInput = () => {
  return fs.readFileSync('/dev/stdin').toString();
}

const getIntInput = () => {
  return getInput().map(line => Number(line));
}

module.exports = {
  getInput,
  getRawInput,
  getIntInput
};
