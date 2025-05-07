const board = document.getElementById('game-board');
const nextBtn = document.getElementById('next-btn');
const icons = ['🏆', '🎯', '🎁', '💎', '🪙', '🎉'];
let cards = [];
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Dubbel array voor 6 paren
const deck = [...icons, ...icons].sort(() => 0.5 - Math.random());

deck.forEach((icon, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.icon = icon;

  card.innerHTML = `
    <div class="front">❓</div>
    <div class="back">${icon}</div>
  `;

  card.addEventListener('click', () => handleCardClick(card));
  board.appendChild(card);
  cards.push(card);
});

function handleCardClick(card) {
  if (lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  const secondCard = card;
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    matchedPairs++;
    firstCard = null;
    if (matchedPairs === icons.length) {
      setTimeout(() => {
        nextBtn.style.display = 'block';
      }, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}

nextBtn.addEventListener('click', () => {
  window.location.href = 'gegevens.html';
});
