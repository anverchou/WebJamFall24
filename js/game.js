const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0; // Initialize player's score
let moves = 0; // Count the number of moves
let highestScore = localStorage.getItem('highestScore') || 0; // Retrieve the highest score

// Display the score and highest score
document.getElementById('current-score').textContent = `Score: ${score}`;
document.getElementById('highest-score').textContent = `Highest Score: ${highestScore}`;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  moves++; // Increment moves for every pair attempt
  isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
  // Update score for a successful match
  score += 10; 
  updateScores();

  disableCards();

  // Check if all cards are matched
  if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
    endGame();
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function updateScores() {
  document.getElementById('current-score').textContent = `Score: ${score}`;
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem('highestScore', highestScore); 
    document.getElementById('highest-score').textContent = `Highest Score: ${highestScore}`;
  }
}

function endGame() {
  alert(`Game Over! Final Score: ${score}`);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle the cards on load
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
