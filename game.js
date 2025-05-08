const fruits = [
  'bananas', 'cherries', 'grape', 'pineapple', 'strawberry', 'watermelon'
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const board = document.getElementById('gameBoard');

function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  card.innerHTML = `
    <div class="front">
      <img src="assets/img/card-icon.png" alt="card icon">
    </div>
    <div class="back">
      <img src="assets/img/${name}.png" alt="${name}">
    </div>
  `;

  card.addEventListener('click', flipCard);
  return card;
}

function startGame() {
  const doubled = [...fruits, ...fruits];
  const shuffled = doubled.sort(() => 0.5 - Math.random());

  board.innerHTML = '';
  shuffled.forEach(fruit => {
    board.appendChild(createCard(fruit));
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

startGame();

document.getElementById('next-btn').addEventListener('click', startGame);
