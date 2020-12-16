const utils = require('../utils');
const day16Utils = require('./day16-utils');
const lines = utils.getRawInput().split('\n');

const rules = day16Utils.parseRules(lines);
const myTicket = day16Utils.parseMyTicket(lines);
const nearby = day16Utils.parseNearby(lines);

console.log(calcErrorSum());

function calcErrorSum() {
  let errorSum = 0;
  nearby.forEach(fields => {
    fields.forEach(field => {
      if (!isValid(field)) errorSum += field;
    });
  });
  return errorSum;
}

function isValid(field) {
  return rules.some(rule =>
    rule.ranges.some(({ from, till }) => field >= from && field <= till)
  );
}

