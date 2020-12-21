const utils = require('../utils');
const lines = utils.getInput();

const allergenesMap = new Map();
const ingredients = new Set();
const ingCount = new Map();
lines.forEach(line => {
  const [rawIngreds, rawAllergenes] = line.split('(contains ');
  const ingreds = rawIngreds.split(' ').filter(a => a !== '');
  ingreds.forEach(ingred => {
    ingredients.add(ingred);
    if (!ingCount.has(ingred)) {
      ingCount.set(ingred, 0);
    }
    ingCount.set(ingred, ingCount.get(ingred) + 1);
  });
  const allergenes = rawAllergenes.substr(0, rawAllergenes.length - 1).split(', ');
  allergenes.forEach(allergene => {
    if (!allergenesMap.has(allergene)) {
      allergenesMap.set(allergene, new Set(ingreds));
    } else {
      allergenesMap.set(allergene, intersection(allergenesMap.get(allergene), new Set(ingreds)));
    }
  });
});

const possiblyAllergen = new Set();

allergenesMap.forEach((val, key) => {
  val.forEach(e => {
    possiblyAllergen.add(e);
  })
});

const noAllergens = new Set();
ingredients.forEach(ing => {
  if (!possiblyAllergen.has(ing)) {
    noAllergens.add(ing);
  }
});

let count = 0;
noAllergens.forEach(noAllergen => {
  count += ingCount.get(noAllergen);
});

console.log(count)

function intersection(setA, setB) {
  let smallerSet = setA.size > setB.size ? setB : setA;
  let largerSet = setA.size > setB.size ? setA : setB;
  return new Set([...smallerSet].filter(element => largerSet.has(element)))
}
