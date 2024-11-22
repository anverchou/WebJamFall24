// Snow Section
const snowContainer = document.querySelector('.snow-container');
const totalSnowflakes = 1000;

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSnowflake(index) {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snow');

  const size = Math.random() * 7 + 3;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  const opacity = Math.random();
  snowflake.style.opacity = opacity;

  const randomX = Math.random() * 100;
  const randomOffset = randomRange(-50, 50);
  const randomXEnd = randomX + randomOffset;
  const randomXEndYoyo = randomX + randomOffset / 3;
  const randomScale = Math.random() * 0.8 + 0.4;
  const fallDuration = randomRange(20, 50);
  const fallDelay = Math.random() * -40;

  snowflake.style.transform = `translate(${randomX}vw, -10px) scale(${randomScale})`;
  snowflake.style.animation = `fall-${index} ${fallDuration}s ${fallDelay}s linear infinite`;

  const keyframes = `
    @keyframes fall-${index} {
      0% {
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
      }
      100% {
        transform: translate(${randomXEndYoyo}vw, 180vh) scale(${randomScale});
      }
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
  snowContainer.appendChild(snowflake);
}

function generateSnowflakes() {
  for (let i = 0; i < totalSnowflakes; i++) {
    createSnowflake(i);
  }
}

// Initial setup and adjust on resize
generateSnowflakes();

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
    music.play();
    playButton.src = "./assets/images/theme/volume-up.svg";
    playButton.alt = "Volume On";
  } else {
    music.pause();
    playButton.src = "./assets/images/theme/volume-mute.svg";
    playButton.alt = "Volume Off";
  }
});

// Select all game boards
const gameBoards = document.querySelectorAll('.cover');

// Add hover effect using JavaScript
gameBoards.forEach((board) => {
  board.addEventListener('mouseenter', () => {
    board.style.transform = 'translateY(-20px) scale(1.05)';
    board.style.filter = 'brightness(1.2)';
  });

  board.addEventListener('mouseleave', () => {
    board.style.transform = 'translateY(0) scale(1)';
    board.style.filter = 'brightness(1)';
  });
});

