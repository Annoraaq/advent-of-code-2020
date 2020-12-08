const utils = require('../utils');
const lines = utils.getInput();
const computer = require('./computer.js');
const day8Utils = require('./day8-utils.js');

const commands = day8Utils.parseCommands(lines);

const [res, acc] = computer.run(commands);

console.log(`acc: ${acc}`);
