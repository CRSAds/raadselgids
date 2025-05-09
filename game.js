const cards = [
  'bananas.png', 'bananas.png',
  'grape.png', 'grape.png',
  'pineapple.png', 'pineapple.png',
  'cherries.png', 'cherries.png',
  'strawberry.png', 'strawberry.png',
  'watermelon.png', 'watermelon.png'
];

const gameBoard = document.getElementById('game-board');
const nextBtn = document.getElementById('next-btn');
let flippedCards = [];
let matched = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const shuffled = shuffle([...cards]);
  gameBoard.innerHTML = '';
  matched = [];

  shuffled.forEach((src, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = src;

    card.innerHTML = `
      <div class="front">
        <img src="assets/img/card-icon.png" alt="front" />
      </div>
      <div class="back">
        <img src="assets/img/${src}" alt="fruit" />
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [a, b] = flippedCards;
    if (a.dataset.image === b.dataset.image) {
      matched.push(a.dataset.image);
      flippedCards = [];

      if (matched.length === cards.length / 2) {
        nextBtn.style.display = 'inline-block';
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flip');
        b.classList.remove('flip');
        flippedCards = [];
      }, 1000);
    }
  }
}

nextBtn.addEventListener('click', () => {
  nextBtn.style.display = 'none';
  createBoard();
});

createBoard();
