let level = 1;
let currentNumber = '';
let gameStarted = false;
let timerInterval;

const levelDisplay = document.getElementById('level');
const numberDisplay = document.getElementById('number-display');
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const feedback = document.getElementById('feedback');

//Button to Start game
startBtn.addEventListener('click', () => {
  if (!gameStarted) {
    startBtn.classList.add('hidden');
    progressBarContainer.classList.remove('hidden');
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  level = 1;
  feedback.textContent = '';
  startLevel();
}

//Display the level 
function startLevel() {
  feedback.textContent = '';
  levelDisplay.textContent = `Level: ${level}`;
  generateNumber();
  showNumber();
}

//Generate number
function generateNumber() {
  currentNumber = '';
  for (let i = 0; i < level; i++) {
    currentNumber += Math.floor(Math.random() * 10).toString(); 
  }
}

function showNumber() {
  numberDisplay.textContent = currentNumber;
  numberDisplay.classList.remove('hidden');
  userInput.classList.add('hidden');

  setTimeout(() => {
    numberDisplay.classList.add('hidden');
    userInput.classList.remove('hidden');
    userInput.value = '';
    userInput.focus();
    //Timer to showNumber
    startTimer();
  }, 500 + level * 500);
}

//ProgressBar timer
function startTimer() {
  let time = 3000 + level * 200;
  let elapsedTime = 0;
  progressBar.style.width = '0%';

  timerInterval = setInterval(() => {
    elapsedTime += 100;
    let progress = (elapsedTime / time) * 100;
    progressBar.style.width = `${progress}%`;

    if (elapsedTime >= time) {
      clearInterval(timerInterval);
      //Check answer if user has number inside box but forgets to enter
      checkAnswer();
    }
  }, 100);
}

//Reset progress Bar
function resetProgressBar() {
  clearInterval(timerInterval);
  progressBar.style.width = '0%';
}

//Allow the user to press Enter to submit early
userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    clearInterval(timerInterval); 
    checkAnswer(); //Check the user's answer 
  }
});

function checkAnswer() {
  const userAnswer = userInput.value.trim(); //Remove extra spaces

  if (userAnswer === currentNumber) {
    feedback.textContent = 'Correct!';
    feedback.style.color = 'green';
    level++;
    resetProgressBar();
    setTimeout(startLevel, 1000);
  } else {
    feedback.textContent = `Game Over! Correct Number: ${currentNumber}`;
    feedback.style.color = 'red';
    endGame(false);
  }
}

function endGame(success) {
  clearInterval(timerInterval);
  if (success) {
    feedback.textContent = 'Congratulations!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = `Game Over! Correct Number: ${currentNumber}`;
    feedback.style.color = 'red';
  }
  gameStarted = false;
  progressBarContainer.classList.add('hidden');
  startBtn.classList.remove('hidden');
  progressBar.style.width = '0%';
}

document.getElementById('menu-toggle').addEventListener('click', function () {
  const dropdownMenu = document.getElementById('dropdown-menu') 
  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});