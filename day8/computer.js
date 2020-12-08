const CMD_NOP = 'nop';
const CMD_ACC = 'acc';
const CMD_JMP = 'jmp';

const ERR_INF = 'E01: infinite loop'
const SUCC = 'success'

let pc = 0;
let acc = 0;

module.exports = {
  CMD_NOP,
  CMD_ACC,
  CMD_JMP,
  ERR_INF,
  SUCC,
  run
};

function run(commands) {
  pc = 0;
  acc = 0;

  const visitedPc = new Set();

  while (pc < commands.length - 1 && !visitedPc.has(pc)) {
    visitedPc.add(pc);
    const { type, param } = commands[pc];
    switch (type) {
      case CMD_NOP:
        processNop();
        break;
      case CMD_ACC:
        processAcc(param);
        break;
      case CMD_JMP:
        processJmp(param);
        break;
    }
  }
  if (visitedPc.has(pc)) {
    return [ERR_INF, acc];
  }
  return [SUCC, acc];
}

function processNop() {
  pc++;
}

function processAcc(incVal) {
  acc += incVal;
  pc++;
}

function processJmp(offset) {
  pc += offset;
}
