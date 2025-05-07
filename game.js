const board = document.getElementById('game-board');
const nextBtn = document.getElementById('next-btn');

const icons = [
  'pineapple.png',
  'grape.png',
  'cherries.png',
  'bananas.png',
  'watermelon.png',
  'strawberry.png'
];

let cardValues = [...icons, ...icons]; // 12 kaarten, 6 paren
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(icon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">
      <img src="assets/img/card-icon.png" alt="?" />
    </div>
    <div class="back">
      <img src="assets/img/${icon}" alt="fruit" />
    </div>
  `;

  card.addEventListener('click', () => handleFlip(card, icon));
  return card;
}

function handleFlip(card, icon) {
  if (
    card.classList.contains('flip') ||
    flippedCards.length >= 2 ||
    card.dataset.locked === 'true'
  ) return;

  card.classList.add('flip');
  flippedCards.push({ card, icon });

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.icon === second.icon) {
      first.card.dataset.locked = true;
      second.card.dataset.locked = true;
      flippedCards = [];
      matchedPairs++;
      if (matchedPairs === icons.length) {
        nextBtn.style.display = 'inline-block';
      }
    } else {
      setTimeout(() => {
        first.card.classList.remove('flip');
        second.card.classList.remove('flip');
        flippedCards = [];
      }, 1000);
    }
  }
}

function startGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  shuffle(cardValues).forEach(icon => {
    board.appendChild(createCard(icon));
  });
}

nextBtn.addEventListener('click', () => {
  window.location.href = 'gegevens.html'; // Pas dit aan indien andere flow
});

startGame();
