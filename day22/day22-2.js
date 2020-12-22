const utils = require('../utils');
const lines = utils.getInput();
const Queue = require('../Queue.js');

const [p1Deck, p2Deck] = parseDecks(lines);
const winner = play(p1Deck, p2Deck);

if (winner == 1) {
  console.log(calcScore(p1Deck));
} else {
  console.log(calcScore(p2Deck));
}

function play(p1Deck, p2Deck) {
  const playedConstellations = new Set();
  while (p1Deck.size() > 0 && p2Deck.size() > 0) {
    const constellationString = toConstellationString(p1Deck, p2Deck);
    if (playedConstellations.has(toConstellationString(p1Deck, p2Deck))) {
      return 1;
    }
    playedConstellations.add(constellationString);
    const p1Top = p1Deck.dequeue();
    const p2Top = p2Deck.dequeue();
    let isP1Winnter = false;
    if (p1Top <= p1Deck.size() && p2Top <= p2Deck.size()) {
      isP1Winner = play(
        Queue(p1Deck.toArray().slice(0, p1Top)),
        Queue(p2Deck.toArray().slice(0, p2Top))
      ) === 1;
    } else {
      isP1Winner = p1Top > p2Top;
    }
    if (isP1Winner) {
      p1Deck.enqueue(p1Top);
      p1Deck.enqueue(p2Top);
    } else {
      p2Deck.enqueue(p2Top);
      p2Deck.enqueue(p1Top);
    }
  }
  return p1Deck.size() == 0 ? 2 : 1;
}

function toConstellationString(p1Deck, p2Deck) {
  return p1Deck.toArray() + '#' + p2Deck.toArray();
}

function calcScore(q) {
  let sum = 0;
  while (q.size() > 0) {
    sum += q.size() * q.dequeue();
  }
  return sum;
}

function parseDecks(lines) {
  const player1Deck = Queue();
  const player2Deck = Queue();
  let player1Finished = false;
  lines.forEach(line => {
    if (line.startsWith('Player 1')) return;
    if (line.startsWith('Player 2')) {
      player1Finished = true;
    } else {
      if (player1Finished) {
        player2Deck.enqueue(Number(line));
      } else {
        player1Deck.enqueue(Number(line));
      }
    }
  });
  return [player1Deck, player2Deck];
}
