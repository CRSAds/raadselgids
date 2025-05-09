const cards = [
  'bananas', 'cherries', 'grape', 'pineapple', 'strawberry', 'watermelon'
];

const gameBoard = document.getElementById('game-board');
let selectedCards = [];
let lockBoard = false;

function shuffle(array) {
  return [...array, ...array].sort(() => 0.5 - Math.random());
}

function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  card.innerHTML = `
    <div class="front">
      <img src="assets/img/card-icon.png" alt="kaart" />
    </div>
    <div class="back">
      <img src="assets/img/${name}.png" alt="${name}" />
    </div>
  `;

  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lockBoard || card.classList.contains('flip') || selectedCards.includes(card)) return;

  card.classList.add('flip');
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [first, second] = selectedCards;
  if (first.dataset.name === second.dataset.name) {
    selectedCards = [];
    lockBoard = false;
  } else {
    first.classList.remove('flip');
    second.classList.remove('flip');
    selectedCards = [];
    lockBoard = false;
  }
}

function initGame() {
  const shuffled = shuffle(cards);
  shuffled.forEach(name => {
    const card = createCard(name);
    gameBoard.appendChild(card);
  });
}

initGame();
