const utils = require('../utils');
const lines = utils.getRawInput().split('\n');
const util = require('util')

const splitPos = lines.indexOf('');
let rules = [];
const messages = [];
const CMD_AND = 'CMD_AND';
const CMD_OR = 'CMD_OR';

for (let i = 0; i < lines.length - 1; i++) {
  if (i < splitPos) {
    const [ruleNo, rule] = lines[i].split(': ');
    rules[ruleNo] = rule.replaceAll('"', '').split(' ');
  } else if (i > splitPos) {
    messages.push(lines[i]);
  }
}

rules = rules.map(rule => {
  return merge(rule);
});

const collapsedRules = rules.map(collapse);
console.log(messages.filter(msg => collapsedRules[0].includes(msg)).length);

function merge(rule) {
  let currAnd = [];
  let currOr = [];
  if (!Array.isArray(rule)) {
    if (!isNaN(Number(rule))) {
      return merge(rules[Number(rule)]);
    }

    return rule;
  }
  for (let i = 0; i < rule.length; i++) {
    if (rule[i] == '|') {
      currOr.push({ type: CMD_AND, val: currAnd });
      currAnd = [];
    } else {
      currAnd.push(merge(rule[i]));
    }
  }
  if (currOr.length > 0) {
    currOr.push({ type: CMD_AND, val: currAnd });
    return { type: CMD_OR, val: currOr };
  } else {
    return { type: CMD_AND, val: currAnd };
  }
}


function cartesian(a, b) {
  const arr = [];
  a.forEach(e1 => {
    b.forEach(e2 => {
      arr.push(e1 + e2)
    })
  });
  return arr;
}

function collapse(rule) {
  if (Array.isArray(rule)) {
    return rule;
  } else if (typeof rule !== 'object') {
    return [rule];
  } else if (rule.type === CMD_AND) {
    const cart = rule.val.map(collapse).reduce((acc, curr) => {
      return cartesian(acc, curr);
    }, ['']);
    return cart;
  } else if (rule.type === CMD_OR) {
    const set = new Set(rule.val.map(collapse).flat().flat());
    return [...set];
  }
  return rule;
}


