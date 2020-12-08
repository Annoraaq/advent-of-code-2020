const utils = require('../utils');
const lines = utils.getInput();
const computer = require('./computer.js');
const day8Utils = require('./day8-utils.js');

const commands = day8Utils.parseCommands(lines);

for (let line = 0; line < commands.length; line++) {
  const command = commands[line];
  let res;
  let acc;

  if (command.type === computer.CMD_NOP) {
    [res, acc] = replaceAndRun(command, computer.CMD_NOP, computer.CMD_JMP);
  } else if (command.type === computer.CMD_JMP) {
    [res, acc] = replaceAndRun(command, computer.CMD_JMP, computer.CMD_NOP);
  } else {
    continue;
  }

  if (res === computer.SUCC) {
    console.log(`acc after fixing: ${acc}`);
    break;
  }
}

function replaceAndRun(cmd, type1, type2) {
  cmd.type = type2
  const result = computer.run(commands);
  cmd.type = type1
  return result;
}
