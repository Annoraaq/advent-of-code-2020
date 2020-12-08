const utils = require('../utils');
const lines = utils.getInput();

const adjList = createBagGraph();

const resultList = new Set();
dfs(adjList, 'shiny gold', (bag) => {
  resultList.add(bag);
});

console.log(resultList.size - 1);

function dfs(adjList, node, visit) {
  visit(node);
  for (let neighbour of adjList.get(node)) {
    dfs(adjList, neighbour, visit);
  }
}

function createBagGraph() {
  const adjacencyList = new Map();

  lines.forEach(line => {
    const [container, containedRaw] = line.split(' bags contain ');
    addIfNotSet(adjacencyList, container);
    const contained = containedRaw.substr(0, containedRaw.length - 1).split(', ');
    const containedClean = contained.map(containedBags =>
      containedBags.substr(containedBags.indexOf(' ') + 1).split(' bag')[0]
    )
    containedClean.forEach(bag => {
      addIfNotSet(adjacencyList, bag);
      adjacencyList.get(bag).add(container);
    });
  });
  return adjacencyList;
}

function addIfNotSet(adjList, value) {
  if (!adjList.has(value)) {
    adjList.set(value, new Set());
  }
}
