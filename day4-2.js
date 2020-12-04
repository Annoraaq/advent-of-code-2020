const utils = require('./utils');
const lines = utils.getRawInput().split('\n');

const requiredFields = [
  { name: 'byr', isValid: create4DigitValidator(1920, 2002) },
  { name: 'iyr', isValid: create4DigitValidator(2010, 2020) },
  { name: 'eyr', isValid: create4DigitValidator(2020, 2030) },
  { name: 'hgt', isValid: validateHgt },
  { name: 'hcl', isValid: validateHcl },
  { name: 'ecl', isValid: validateEcl },
  { name: 'pid', isValid: validatePid },
];

const noOfValidPassports = extractPassports(lines).filter(isPassportValid).length;

console.log(`valid passports: ${noOfValidPassports}`);

function isPassportValid(passport) {
  return requiredFields.every(isFieldValid);

  function isFieldValid(field) {
    return passport[field.name] && field.isValid(passport[field.name]);
  }
}

function validateHgt(hgt) {
  if (!/[0-9]+(cm|in)/.test(hgt)) return false;
  if (hgt.endsWith('cm')) {
    const number = Number(hgt.substr(0, hgt.indexOf('cm')));
    return number >= 150 && number <= 193
  } else {
    const number = Number(hgt.substr(0, hgt.indexOf('in')));
    return number >= 59 && number <= 76
  }
}

function validateHcl(hcl) {
  if (hcl.length !== 7) return false;
  if (hcl[0] !== '#') return false;
  const rest = hcl.substr(1, 6);
  return !/[^a-f0-9]/.test(rest);
}

function validateEcl(ecl) {
  const whitelist = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return whitelist.includes(ecl);
}

function validatePid(pid) {
  return pid.length === 9 && !/[^0-9]/.test(pid);
}

function create4DigitValidator(min, max) {
  return (no) => no.length == 4 && Number(no) >= min && Number(no) <= max;
}

function extractPassports(input) {
  const passports = [];
  let passport = [];
  lines.forEach(line => {
    if (line == '') {
      passports.push(passport);
      passport = {};
    } else {
      line.split(' ').map(keyVal => keyVal.split(':')).forEach(([key, val]) => {
        passport[key] = val;
      });
    }
  });
  return passports;
}
