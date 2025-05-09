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
      // Alles gematched
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
  document.getElementById('next-btn').style.display = 'block';
}

// Confetti
function launchConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.4 },
    });
  }
}

// Start spel
document.getElementById('start-game-btn').addEventListener('click', () => {
  document.getElementById('intro').style.display = 'none';
  document.querySelector('main').style.display = 'flex';
});
