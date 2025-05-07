const cards = [
  "bananas", "cherries", "grape",
  "pineapple", "strawberry", "watermelon"
];

let cardArray = [...cards, ...cards];
cardArray = cardArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("game-board");
let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0;

function createCard(name) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  const front = document.createElement("div");
  front.classList.add("front");
  const frontImg = document.createElement("img");
  frontImg.src = "assets/img/card-icon.png";
  front.appendChild(frontImg);

  const back = document.createElement("div");
  back.classList.add("back");
  const backImg = document.createElement("img");
  backImg.src = `assets/img/${name}.png`;
  back.appendChild(backImg);

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) {
    disableCards();
  } else {
    setTimeout(unflipCards, 700); // flikker fix: iets kortere timeout
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  matchesFound++;

  if (matchesFound === cards.length) {
    document.getElementById("next-btn").style.display = "inline-block";
  }
}

function unflipCards() {
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
  resetBoard();
}

function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function initGame() {
  gameBoard.innerHTML = "";
  matchesFound = 0;
  document.getElementById("next-btn").style.display = "none";
  cardArray.forEach(name => {
    gameBoard.appendChild(createCard(name));
  });
}

initGame();
