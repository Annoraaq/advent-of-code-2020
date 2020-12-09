module.exports = { findInvalidNo };

function findInvalidNo(preambleLen, lines) {
  for (let i = preambleLen; i < lines.length; i++) {
    if (!isValid(i, preambleLen, lines)) {
      return lines[i];
    }
  }
  return NaN;
}

function isValid(index, preambleLen, lines) {
  for (let i = index - preambleLen; i < index; i++) {
    for (let j = index - preambleLen; j < index; j++) {
      if (i !== j && lines[i] + lines[j] === lines[index]) {
        return true;
      }
    }
  }
  return false;
}
