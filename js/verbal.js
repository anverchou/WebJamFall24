let score = 0;
let lives = 3;
let currentWord = "";
let gameStarted = false;
let highestScore = localStorage.getItem('verbalHighestScore') || 0;

const appearedWords = new Set();

const wordDisplay = document.getElementById("word-display");
const startBtn = document.getElementById("start-btn");
const seenBtn = document.getElementById("seen-btn");
const newBtn = document.getElementById("new-btn");
const livesDisplay = document.getElementById("lives");
const currentScoreDisplay = document.getElementById('current-score');
const highestScoreDisplay = document.getElementById('highest-score');

highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;


// Button to Start game
startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    lives = 3;
    wordDisplay.style.color = "black";
    startBtn.classList.add("hidden");
    seenBtn.classList.remove("hidden");
    newBtn.classList.remove("hidden");
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  score = 0;
  //   feedback.textContent = '';
  startLevel();
}

// Display the level
function startLevel() {
  //   feedback.textContent = '';
  currentScoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  updateScores();
  // Lose the game
  if (lives == 0) {
    newBtn.classList.add("hidden");
    seenBtn.classList.add("hidden");

    wordDisplay.textContent = "You ran out of lives!";
    wordDisplay.style.color = 'red';

    startBtn.classList.remove("hidden");
    gameStarted = false;
  } else {
    // updateScores();
    generateWord();
    showWord();
  }
}

// Generate word
function generateWord() {
  currentWord = wordsBundle[Math.floor(Math.random() * wordsBundle.length)];
}

function showWord() {
  wordDisplay.textContent = currentWord;
  wordDisplay.classList.remove("hidden");
}

function updateScores() {
  currentScoreDisplay.textContent = `Score: ${score}`;

  // Update highest score if current score exceeds it
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem('verbalHighestScore', highestScore);
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
  }

};

seenBtn.addEventListener("click", () => {
  if (!appearedWords.has(currentWord)) {
    appearedWords.add(currentWord);

    lives--;
    // currentScoreDisplay.textContent = `Score: ${score}`;
  } else {
    score += 10;
    // currentScoreDisplay.textContent = `Score: ${score}`;
  }

  startLevel();
});

newBtn.addEventListener("click", () => {
  if (appearedWords.has(currentWord)) {

    lives --;
  } else {
    appearedWords.add(currentWord);
    score += 10;
    // currentScoreDisplay.textContent = `Score: ${score}`;
  }
  
  startLevel();
});

document.getElementById('menu-toggle').addEventListener('click', function () {
  const dropdownMenu = document.getElementById('dropdown-menu');
  if (!dropdownMenu.style.display || dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block"; // Show the menu
  } else {
    dropdownMenu.style.display = "none"; // Hide the menu
  }
});

// side navigation bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "white";
}

const wordsBundle = [
  "Angel",
  "Birth",
  "Candy",
  "Carolers",
  "Carolling",
  "Carols",
  "Celebrate",
  "Chestnuts",
  "Chimney",
  "Christmas",
  "Christmas Card",
  "Christmas Carol",
  "Christmas Eve",
  "Christmas Tree",
  "Christmas Tree Stand",
  "December 25th",
  "Elf",
  "Elves",
  "Family",
  "Father Christmas",
  "Feast",
  "Festive",
  "Frankincense",
  "Frosty the Snowman",
  "Fruitcake",
  "Gingerbread House",
  "Goose",
  "Holiday",
  "Holly",
  "Jack Frost",
  "Jesus",
  "Jolly",
  "Kris Kringle",
  "Merry",
  "Mistletoe",
  "Myrrh",
  "Nativity",
  "North Pole",
  "Ornaments",
  "Pinecone",
  "Plum pudding",
  "Presents",
  "Reindeer",
  "Rejoice",
  "Rudolph",
  "Saint Nicholas",
  "Santa Claus",
  "Santa’s helpers",
  "Santa’s workshop",
  "Scrooge",
  "Season’s greetings",
  "Sled",
  "Sleigh",
  "Sleigh bells",
  "Snowball",
  "Snowman",
  "Spirit",
  "St. Nicks",
  "Stocking",
  "Tidings",
  "Tinsel",
  "Tradition",
  "Xmas",
  "Yuletide",
];
