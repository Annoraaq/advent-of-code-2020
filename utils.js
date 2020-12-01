const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('/dev/stdin').toString().split('\n').filter(line => line !== '');
}

const getIntInput = () => {
  return getInput().map(line => Number(line));
}

module.exports = {
  getInput,
  getIntInput
};
