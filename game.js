const cardsArray = [
  "pineapple", "grape", "cherries", "bananas", "watermelon", "strawberry"
];
let cards = [...cardsArray, ...cardsArray];

cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("game-board");
cards.forEach((name) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;
  card.innerHTML = `
    <div class="inner">
      <div class="front"><img src="icons/eye.svg" /></div>
      <div class="back"><img src="icons/${name}.png" /></div>
    </div>`;
  board.appendChild(card);
});

let flippedCards = [];
board.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || card.classList.contains("flip") || flippedCards.length === 2) return;
  card.classList.add("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [a, b] = flippedCards;
    if (a.dataset.name === b.dataset.name) {
      flippedCards = [];
    } else {
      setTimeout(() => {
        a.classList.remove("flip");
        b.classList.remove("flip");
        flippedCards = [];
      }, 800);
    }
  }
});
