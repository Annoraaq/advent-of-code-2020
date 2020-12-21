const utils = require('../utils');
const lines = utils.getInput();

const [allergenesMap, ingredients, ingCount] = parseInput(lines);
findMapping(allergenesMap);

console.log(createDangerousIngList(allergenesMap).join(','));

function findMapping(allergenesMap) {
  let run = true;
  while (run) {
    run = false;
    allergenesMap.forEach((val, key) => {
      if (val.size > 1) {
        run = true;
      } else {
        allergenesMap.forEach((val2, key2) => {
          if (key !== key2) {
            val2.delete([...val][0]);
          }
        });
      }
    });
  }
}

function createDangerousIngList(allergenesMap) {
  const finalAllergenes = [...allergenesMap.keys()];
  finalAllergenes.sort();

  return finalAllergenes.map(allergene =>
    [...allergenesMap.get(allergene)][0]
  );
}

function parseInput(lines) {
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
  return [allergenesMap, ingredients, ingCount];
}

function intersection(setA, setB) {
  let smallerSet = setA.size > setB.size ? setB : setA;
  let largerSet = setA.size > setB.size ? setA : setB;
  return new Set([...smallerSet].filter(element => largerSet.has(element)))
}
