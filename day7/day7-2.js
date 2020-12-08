const utils = require('../utils');
const lines = utils.getInput();

const adjList = createBagGraph();
let resCount = numBags(adjList, ['shiny gold', 0]);

console.log(resCount);

function numBags(adjList, [node, bagCount]) {
  return [...adjList.get(node)].map(([child, bagCount]) => {
    return bagCount + bagCount * numBags(adjList, [child, bagCount]);
  }).reduce(sumReduce, 0);
}

function createBagGraph() {
  const adjacencyList = new Map();

  lines.forEach(line => {
    const [container, contained] = parseLine(line);
    addIfNotSet(adjacencyList, container);

    contained.forEach(([bagCount, bagType]) => {
      addIfNotSet(adjacencyList, bagType);
      adjacencyList.get(container).add([bagType, bagCount]);
    });
  });
  return adjacencyList;
}

function sumReduce(acc, curr) {
  return acc + curr;
}

function parseLine(line) {
  const [container, containedRaw] = line.split(' bags contain ');
  const contained = containedRaw.substr(0, containedRaw.length - 1).split(', ');
  const containedParsed = contained.map(parseBag).filter(validBag);
  return [container, containedParsed];
}

function parseBag(bagStr) {
  const bagCount = Number(bagStr.substr(0, bagStr.indexOf(' ')));
  const bagType = bagStr.substr(bagStr.indexOf(' ') + 1).split(' bag')[0];
  return [bagCount, bagType];
}

function validBag([_bagCount, bagType]) {
  return bagType !== 'other';
}

function addIfNotSet(adjList, value) {
  if (!adjList.has(value)) {
    adjList.set(value, new Set());
  }
}
