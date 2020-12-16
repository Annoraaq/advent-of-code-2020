const utils = require('../utils');
const day16Utils = require('./day16-utils');
const lines = utils.getRawInput().split('\n');

const rules = day16Utils.parseRules(lines);
const myTicket = day16Utils.parseMyTicket(lines);
const nearby = day16Utils.parseNearby(lines);

const validTickets = nearby.filter(isValidTicket);
const validRulesForCol = getValidRulesForCol(validTickets);
const colToName = getColToName(validRulesForCol);

console.log(getResultProduct(colToName));

function getColToName(validRulesForCol) {
  const usedRules = new Set();
  const colToName = new Map();

  for (let len = 1; len <= validTickets[0].length; len++) {
    for (let col = 0; col < validTickets[0].length; col++) {
      if (validRulesForCol[col].length == len) {
        const filteredRules = validRulesForCol[col].filter(name => !usedRules.has(name));
        colToName.set(col, filteredRules[0]);
        usedRules.add(filteredRules[0]);
        break;
      }
    }
  }
  return colToName;
}

function getResultProduct() {
  let product = 1;
  myTicket.forEach((field, index) => {
    if (colToName.get(index).startsWith('departure')) {
      product *= field;
    }
  });
  return product;
}

function getValidRulesForCol(validTickets) {
  const validRulesForCol = [];
  for (let col = 0; col < validTickets[0].length; col++) {
    const validRules = rules.filter(rule =>
      validTickets.every(ticket => matches(ticket[col], rule))
    ).map(rule => rule.name);
    validRulesForCol[col] = validRules;
  }
  return validRulesForCol;
}

function isValidTicket(ticket) {
  return ticket.every(isValid);
}

function isValid(field) {
  return rules.some(rule =>
    matches(field, rule)
  );
}

function matches(field, rule) {
  return rule.ranges.some(({ from, till }) => field >= from && field <= till);
}

