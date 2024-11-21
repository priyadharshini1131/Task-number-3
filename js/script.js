// Global variables
let cards = [];
let flippedCards = [];
let matchedCards = 0;
const totalPairs = 8; // Total number of pairs in the game
const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");

// Function to create a deck of cards
function createDeck() {
  const cardValues = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H", // 8 different pairs
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ];
  // Shuffle the card values
  cardValues.sort(() => Math.random() - 0.5);

  // Create card elements and add to the game board
  cards = cardValues.map((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value; // Store the card's value in a data attribute
    card.innerText = ""; // Empty text for now
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
    return card;
  });
}

// Handle card flip
function handleCardClick(event) {
  const card = event.target;

  if (card.classList.contains("flipped") || flippedCards.length === 2) {
    return; // Ignore clicks on already flipped cards or if two cards are already flipped
  }

  card.classList.add("flipped");
  card.innerText = card.dataset.value; // Show the value of the card
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards++;
    flippedCards = [];
    if (matchedCards === totalPairs) {
      setTimeout(() => alert("You Win! All pairs matched."), 300);
    }
  } else {
    // If cards don't match, flip them back after a short delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 1000);
  }
}

// Reset the game
function resetGame() {
  gameBoard.innerHTML = ""; // Clear the game board
  matchedCards = 0;
  flippedCards = [];
  createDeck(); // Create and shuffle a new deck
}

// Event listener for the reset button
resetButton.addEventListener("click", resetGame);

// Initialize the game
createDeck();
