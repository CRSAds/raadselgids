const cards = [
  "bananas", "bananas",
  "grape", "grape",
  "cherries", "cherries",
  "pineapple", "pineapple",
  "strawberry", "strawberry",
  "watermelon", "watermelon"
];

const gameBoard = document.getElementById("gameBoard");
const nextBtn = document.getElementById("next-btn");

let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

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

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flip")) return;

    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
    } else {
      if (firstCard.dataset.name === card.dataset.name) {
        matchedPairs++;
        firstCard = null;
        if (matchedPairs === cards.length / 2) {
          setTimeout(() => {
            nextBtn.style.display = "inline-block";
          }, 500);
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          card.classList.remove("flip");
          firstCard.classList.remove("flip");
          firstCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  });

  return card;
}

function initGame() {
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  firstCard = null;
  lockBoard = false;
  nextBtn.style.display = "none";

  const shuffled = shuffle([...cards]);
  shuffled.forEach((name) => {
    const card = createCard(name);
    gameBoard.appendChild(card);
  });
}

nextBtn.addEventListener("click", initGame);

// Start bij laden
initGame();
