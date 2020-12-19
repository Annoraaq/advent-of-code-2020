const utils = require('../utils');
const lines = utils.getRawInput().split('\n');

const splitPos = lines.indexOf('');
let [rules, messages] = parse(lines);
const CMD_AND = 'CMD_AND';
const CMD_OR = 'CMD_OR';

rules = mergeRules(rules);

const res42 = collapse(rules[42]);
const res31 = collapse(rules[31]);

console.log(messages.filter(msg => doesMatch(msg, 0, 0, 0)).length);

function doesMatch(msg, aTimes, bTimes, pos, bOnly) {
  if (aTimes < bTimes) return false;
  if (pos > msg.length) return false;
  if (pos == msg.length) {
    const re = aTimes >= 2 && bTimes >= 1 && aTimes - bTimes >= 1;
    return re;
  }
  let aFinish = false;
  if (!bOnly) {
    const aMatches = res42.filter(r42 => msg.substr(pos).startsWith(r42));
    aFinish = aMatches.some(r42 => doesMatch(msg, aTimes + 1, bTimes, pos + r42.length));
  }
  const bMatches = res31.filter(r31 => msg.substr(pos).startsWith(r31));
  const bFinish = bMatches.some(r31 => doesMatch(msg, aTimes, bTimes + 1, pos + r31.length, true));
  return aFinish || bFinish;
}

function parse(lines) {
  let rules = [];
  let messages = [];

  for (let i = 0; i < lines.length - 1; i++) {
    if (i < splitPos) {
      const [ruleNo, rule] = lines[i].split(': ');
      rules[ruleNo] = rule.replaceAll('"', '').split(' ');
    } else if (i > splitPos) {
      messages.push(lines[i]);
    }
  }
  return [rules, messages];
}

function mergeRules(rules) {
  return rules.map(rule => {
    return merge(rule);
  });
}

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
