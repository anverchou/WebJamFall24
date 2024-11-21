let score = 0;
let lives = 3;
let currentWord = "";
let gameStarted = false;
const appearedWords = new Set();

const wordDisplay = document.getElementById("word-display");
const startBtn = document.getElementById("start-btn");
const seenBtn = document.getElementById("seen-btn");
const newBtn = document.getElementById("new-btn");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");

// Button to Start game
startBtn.addEventListener("click", () => {
  if (!gameStarted) {
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
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  generateWord();
  showWord();
}

// Generate word
function generateWord() {
  currentWord = wordsBundle[Math.floor(Math.random() * wordsBundle.length)];
}

function showWord() {
  wordDisplay.textContent = currentWord;
  wordDisplay.classList.remove("hidden");
}

seenBtn.addEventListener("click", () => {
  if (!appearedWords.has(currentWord)) {
    appearedWords.add(currentWord);
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
});

newBtn.addEventListener("click", () => {
  if (appearedWords.has(currentWord)) {
    appearedWords.delete(currentWord);
    scoreDisplay.textContent = `Score: ${score}`;
  }
  
});

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
