const cards = document.querySelectorAll('.memory-card');
const currentScoreDisplay = document.getElementById('current-score');
const highestScoreDisplay = document.getElementById('highest-score');
const resetButton = document.getElementById('new-game');

// Game state variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 200;
let moves = 0;
let matchedPairs = 0;
let highestScore = localStorage.getItem('highestScore') || 0;

// Initialize score displays
updateScores();

document.getElementById('menu-toggle').addEventListener('click', function () {
  const dropdownMenu = document.getElementById('dropdown-menu');
  if (!dropdownMenu.style.display || dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block"; // Show the menu
  } else {
    dropdownMenu.style.display = "none"; // Hide the menu
  }
});

// Game functions
function flipCard() {
  if (lockBoard) return; // Prevent interaction during unflip delay
  if (this === firstCard) return; // Prevent flipping the same card twice

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card flipped
  secondCard = this;
  lockBoard = true; // Lock the board to prevent further clicks
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  moves++; // Increment moves for every pair attempt
  if (isMatch) {
    handleMatch();
  } else {
    score -= 10;
    updateScores();
    unflipCards();
  }
}

function handleMatch() {
  matchedPairs++;
  score += 50; // Increment score for a successful match
  updateScores();

  // Disable matched cards
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  // Check if all cards are matched
  if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
    endGame();
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  // Reset tracking variables
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function updateScores() {
  currentScoreDisplay.textContent = `Score: ${score}`;

  // Update highest score if current score exceeds it
  if (score > highestScore) {
    highestScore = score;
    if (moves == 0) highestScore = 0;
    if (matchedPairs == 0) highestScore = 0;
    localStorage.setItem('highestScore', highestScore);
  }

  highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
}

// Alert when game is over
// function endGame() {
//   alert(`Game Over! Final Score: ${score}`);
// }

// Shuffle the cards on load
(function shuffle() {
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Reset game functionality
function resetScores() {
  localStorage.removeItem('highestScore'); // Clear highest score from storage
  score = 0;
  highestScore = 0;
  moves = 0;

  // Update score displays
  currentScoreDisplay.textContent = `Score: ${score}`;
  highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;

  alert('Scores have been reset!');
  resetGame(); // Restart the game
}

function resetGame() {
  score = 200;
  moves = 0;
  updateScores();
  
  // Reset all cards and reinitialize the game
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Shuffle the cards again
  shuffle();

  // Reset board variables
  resetBoard();
}

// Go back to main menu
function goToMainMenu() {
  window.location.href = 'index.html';
}

// Add event listeners
cards.forEach((card) => card.addEventListener('click', flipCard));
resetButton.addEventListener('click', resetGame);

// Music Section
window.addEventListener('load', () => {
  const music = document.getElementById('background-music');
  music.play().catch((error) => {
    console.log('Audio playback was prevented by the browser:', error);
  });
});

const music = document.getElementById('background-music');
const playButton = document.getElementById('volume-icon');

playButton.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch((error) => {
      console.log('Audio playback was prevented by the browser:', error);
    });
    playButton.src = "./assets/images/theme/volume-up.svg";
    playButton.alt = "Volume On";
  } else {
    music.pause();
    playButton.src = "./assets/images/theme/volume-mute.svg";
    playButton.alt = "Volume Off";
  }
});