const allCards = [
  "10D_Fence.png", "10_Construction.png", "10_Fence.png", "10_Pool.png",
  "11D_Fence.png", "11D_Market.png", "11_Fence.png", "11_Market.png", "11_Park.png",
  "12_Construction.png", "12_Market.png", "12_Park.png", "13_Bis.png", "13_Construction.png",
  "13_Fence.png", "13_Pool.png", "14_Fence.png", "14_Market.png", "14_Park.png",
  "15_Fence.png", "15_Market.png", "15_Park.png", "1_Fence.png", "1_Market.png",
  "1_Park.png", "2_Fence.png", "2_Market.png", "2_Park.png", "3_Bis.png", "3_Construction.png",
  "3_Fence.png", "3_Pool.png", "4_Bis.png", "4_Construction.png", "4_Market.png",
  "4_Park.png", "4_Pool.png", "5D_fence.png", "5D_Market.png", "5D_Park.png",
  "5_Fence.png", "5_Market.png", "5_Park.png", "6D_Fence.png", "6_Bis.png",
  "6_Construction.png", "6_Fence.png", "6_Market.png", "6_Park.png", "6_Pool.png",
  "7_Construction.png", "7_Fence.png", "7_Market.png", "7_Park.png", "7_Pool.png",
  "8D_fence.png", "8D_Market.png", "8D_Park.png", "8_Bis.png", "8_Construction.png",
  "8_Fence.png", "8_Market.png", "8_Park.png", "8_Pool.png", "9D_Park.png",
  "9_Construction.png", "9_Fence.png", "9_Market.png", "9_Park.png"
];

const backCards = [
  "B_Bis.png", "B_Construction.png", "B_Fence.png", "B_Market.png", "B_Park.png", "B_Pool.png"
];

let allPlayableCards = [...allCards];
let discardPile = [];
let selectedCard = null;
let cardDataThisRound = [];

function getBackCard(frontName) {
  const parts = frontName.split("_");
  const type = parts[1].replace(".png", "");
  return `Pages/cards/B_${type}.png`;
}

function shuffleAndDisplayCards() {
  if (allPlayableCards.length < 3) {
    allPlayableCards = [...allCards, ...discardPile];
    discardPile = [];
  }

  cardDataThisRound = [];
  selectedCard = null;

  const selected = [];
  while (selected.length < 3 && allPlayableCards.length > 0) {
    const randIndex = Math.floor(Math.random() * allPlayableCards.length);
    const card = allPlayableCards.splice(randIndex, 1)[0];
    selected.push(card);
  }

  cardDataThisRound = selected;

  const container = document.getElementById('card-container');
  container.innerHTML = '';

  selected.forEach(card => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card';

    const front = document.createElement('img');
    front.className = 'front';
    front.src = `Pages/cards/${card}`;
    front.alt = card;
    front.dataset.cardFront = front.src;

    const back = document.createElement('img');
    back.className = 'back';
    back.src = getBackCard(card);
    back.alt = "Back of " + card;

    cardWrapper.appendChild(front);
    cardWrapper.appendChild(back);
    container.appendChild(cardWrapper);
  });

  setupCardClickHandlers();
}

function setupCardClickHandlers() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((clickedCard, index) => {
    clickedCard.addEventListener('click', () => {
      if (selectedCard && selectedCard !== clickedCard) return;

      const isAlreadyScaled = clickedCard.classList.contains('scaled');

      if (isAlreadyScaled) {
        // Deselect
        cards.forEach(card => {
          card.classList.remove('scaled', 'flipped');
        });
        selectedCard = null;
      } else {
        // Select one, flip others
        cards.forEach((card, i) => {
          if (card === clickedCard) {
            card.classList.add('scaled');
            selectedCard = card;
          } else {
            card.classList.add('flipped');
            discardPile.push(cardDataThisRound[i]);
          }
        });
      }
    });
  });
}

// Buttons
document.getElementById('shuffle-button').addEventListener('click', () => {
  allPlayableCards = [...allPlayableCards, ...discardPile];
  discardPile = [];
  shuffleAndDisplayCards();
});

document.getElementById('next-button').addEventListener('click', () => {
  if (!selectedCard) {
    alert("Select a card before going to the next set.");
    return;
  }

  shuffleAndDisplayCards();
});

// On page load
window.addEventListener('DOMContentLoaded', shuffleAndDisplayCards);
