// Snow Section
const snowContainer = document.querySelector('.snow-container');
const totalSnowflakes = 600;

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < totalSnowflakes; i++) {
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
  const randomYoyoTime = randomRange(40000, 90000) / 100000;
  const randomYoyoY = randomYoyoTime * 150;
  const randomScale = Math.random() * 0.8 + 0.4;
  const fallDuration = randomRange(20, 50);
  const fallDelay = Math.random() * -40;

  snowflake.style.transform = `translate(${randomX}vw, -10px) scale(${randomScale})`;
  snowflake.style.animation = `fall-${i} ${fallDuration}s ${fallDelay}s linear infinite`;

  const keyframes = `
    @keyframes fall-${i} {
      ${randomYoyoTime * 100}% {
        transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
      }
      to {
        transform: translate(${randomXEndYoyo}vw, 100vh) scale(${randomScale});
      }
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);

  snowContainer.appendChild(snowflake);
}

// Music Section
window.addEventListener('load', () => {
  const music = document.getElementById('background-music');
  music.play().catch((error) => {
    console.log('Audio playback was prevented by the browser:', error);
  });
});

const music = document.getElementById('background-music');
const playButton = document.getElementById('play-music');
const pauseButton = document.getElementById('pause-music');

playButton.addEventListener('click', () => {
  music.play();
});

pauseButton.addEventListener('click', () => {
  music.pause();
});



