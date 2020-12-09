const utils = require('../utils');
const { findInvalidNo } = require('./day9-utils');
const lines = utils.getIntInput();

const PREAMBLE_LEN = 25;

console.log(`first invalid number: ${findInvalidNo(PREAMBLE_LEN, lines)}`);
