const elements = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let interval;
elements.startBtn.addEventListener('click', handlerStartClick);
elements.stopBtn.addEventListener('click', handlerStopClick);

function handlerStartClick() {
  elements.startBtn.disabled = true;
  interval = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1500);
}

function handlerStopClick() {
  elements.startBtn.disabled = false;
  clearInterval(interval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
