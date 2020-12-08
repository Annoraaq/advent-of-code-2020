const utils = require('../utils');
const lines = utils.getRawInput().split('\n');

const groups = extractGroups(lines);
const answerCount = groups.reduce((acc, curr) => acc + countGroupAnswers(curr), 0);

console.log(`number of answers: ${answerCount}`);

function countGroupAnswers(group) {
  return getCommonAnswers(group).length;
}

function getCommonAnswers(group) {
  const allAnswers = getAllAnswers(group);
  return [...allAnswers].filter(answer =>
    group.every(personAnswer => personAnswer.includes(answer))
  );
}

function getAllAnswers(group) {
  return new Set(group.flat());
}

function extractGroups(lines) {
  const groups = [];
  let group = [];
  lines.forEach(line => {
    if (line == '') {
      groups.push(group);
      group = [];
    } else {
      group.push([...line]);
    }
  });
  return groups;
}
