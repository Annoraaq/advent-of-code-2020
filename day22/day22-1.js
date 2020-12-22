const utils = require('../utils');
const lines = utils.getInput();
const Queue = require('../Queue.js');

const [p1Deck, p2Deck] = parseDecks(lines);
play(p1Deck, p2Deck);

if (p1Deck.size() > 0) {
  console.log(calcScore(p1Deck));
} else {
  console.log(calcScore(p2Deck));
}

function play(p1Deck, p2Deck) {
  while (p1Deck.size() > 0 && p2Deck.size() > 0) {
    const p1Top = p1Deck.dequeue();
    const p2Top = p2Deck.dequeue();
    if (p1Top > p2Top) {
      p1Deck.enqueue(p1Top);
      p1Deck.enqueue(p2Top);
    } else {
      p2Deck.enqueue(p2Top);
      p2Deck.enqueue(p1Top);
    }
  }
}

function calcScore(q) {
  let sum = 0;
  while (q.size() > 0) {
    sum += q.size() * q.dequeue();
  }
  return sum;
}

function printQueue(q) {
  while (q.size() > 0) {
    console.log(q.dequeue());
  }
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
