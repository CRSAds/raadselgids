// Start spel
document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('game-section').classList.remove('hidden');
});

const cards = document.querySelectorAll('.card');
let flippedCard = null;
let lockBoard = false;
let matches = 0;

function flipCard() {
  if (lockBoard || this === flippedCard) return;

  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = this;
    return;
  }

  const match = flippedCard.dataset.image === this.dataset.image;

  if (match) {
    matches++;
    flippedCard = null;

    if (matches === 6) {
      showNextButton();
      launchConfetti();
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      this.classList.remove('flip');
      flippedCard.classList.remove('flip');
      flippedCard = null;
      lockBoard = false;
    }, 800);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

function showNextButton() {
  const btn = document.getElementById('next-btn');
  btn.classList.remove('hidden');
}

function launchConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.4 },
    });
  }
}
