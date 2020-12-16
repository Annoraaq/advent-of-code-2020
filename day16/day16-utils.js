module.exports = { parseRules, parseMyTicket, parseNearby };

function parseRules(lines) {
  const rules = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] == '') break;
    rules.push(parseRule(lines[i]));
  }
  return rules;
}

function parseMyTicket(lines) {
  const index = lines.findIndex(line => line.startsWith('your')) + 1;
  return lines[index].split(',').map(val => Number(val));
}

function parseNearby(lines) {
  const nearby = [];
  const startIndex = lines.findIndex(line => line.startsWith('nearby')) + 1;
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i] == '') break;
    nearby.push(lines[i].split(',').map(val => Number(val)));
  }
  return nearby;
}

function parseRule(line) {
  const [name, rest] = line.split(':');
  const tokens = rest.split(' ');
  tokens.splice(0, 1);
  const ranges = tokens.filter(token => token != 'or').map(parseRange);
  return { name, ranges };
}

function parseRange(token) {
  const [from, till] = token.split('-');
  return { from: Number(from), till: Number(till) };
}
