let countdown;
let isBreak = false;
let pausedSeconds;

let activityTime = 10; // 15min in sec
const breakTime = 5; // 5min in sec

const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const presetBtn = document.querySelectorAll('[data-time]');
const alarmSound = document.querySelector('audio');
const timerDisplay = document.querySelector('.timer__display');


function displayTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  timerDisplay.textContent = display;

  isBreak ? document.body.classList.add('breakBg') : document.body.classList.remove('breakBg');

  countdown ? (isBreak ? document.title = `${display} Break Time` : document.title = `${display} Activity Time`) : null;
}

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now() / 1000;

  countdown = setInterval(() => {
    const countdownSeconds = Math.round((now + seconds) - (Date.now() / 1000));

    if (countdownSeconds < 0 && isBreak === true) {
      clearInterval(countdown);
      alarmSound.play();
      displayTimer(0);
      return;
    }

    if (countdownSeconds < 0) {
      clearInterval(countdown);
      alarmSound.play();
      isBreak = true;
      displayTimer(breakTime);
      return;
    }

    pausedSeconds = countdownSeconds;
    displayTimer(countdownSeconds);
  }, 1000);
}


function startTimer() {
  const seconds = pausedSeconds || (isBreak ? breakTime : activityTime);
  timer(seconds);
}

function pauseTimer() {
  clearInterval(countdown);
  displayTimer(pausedSeconds || activityTime);
}

function resetTimer() {
  clearInterval(countdown);
  isBreak = false;
  pausedSeconds = null;
  displayTimer(activityTime);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

presetBtn.forEach(button => button.addEventListener('click', function () {
  pausedSeconds = null;
  isBreak = false;
  clearInterval(countdown);
  activityTime = this.dataset.time * 60;
  displayTimer(this.dataset.time * 60);
}));

displayTimer(activityTime);