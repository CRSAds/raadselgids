const board = document.getElementById('game-board');
const nextBtn = document.getElementById('next-btn');

const images = [
  'bananas.png',
  'cherries.png',
  'grape.png',
  'pineapple.png',
  'strawberry.png',
  'watermelon.png'
];

let cards = [...images, ...images]; // Dubbel voor paren
cards.sort(() => Math.random() - 0.5);

let flipped = [];
let matched = [];

cards.forEach((img, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.image = img;

  card.innerHTML = `
    <div class="front"><img src="assets/img/card-icon.png" alt="?" /></div>
    <div class="back"><img src="assets/img/${img}" alt="${img}" /></div>
  `;

  card.addEventListener('click', () => {
    if (card.classList.contains('flip') || flipped.length === 2) return;

    card.classList.add('flip');
    flipped.push(card);

    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (first.dataset.image === second.dataset.image) {
        matched.push(first, second);
        flipped = [];
        if (matched.length === cards.length) {
          nextBtn.style.display = 'block';
        }
      } else {
        setTimeout(() => {
          first.classList.remove('flip');
          second.classList.remove('flip');
          flipped = [];
        }, 800);
      }
    }
  });

  board.appendChild(card);
});
