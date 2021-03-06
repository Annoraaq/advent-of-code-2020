const utils = require('../utils');
const lines = utils.getRawInput().split('\n');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const noOfValidPassports = extractPassports(lines).filter(passport =>
  requiredFields.every(reqField => passport.hasOwnProperty(reqField))
).length;

console.log(`valid passports: ${noOfValidPassports}`);

function extractPassports(lines) {
  const passports = [];
  let passport = {};
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
