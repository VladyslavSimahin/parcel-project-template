// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const elements = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.btn.addEventListener('click', handlerClick);
elements.btn.disabled = true;

let newTime = null;
let lastTime = null;
let choiseData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Report.failure('Error', '"Please choose a date in the future"');
    }

    elements.btn.disabled = false;
    choiseData = selectedDates[0].getTime();
  },
};
flatpickr(elements.input, options);

function handlerClick() {
  const timerId = setInterval(() => {
    elements.btn.disabled = true;
    elements.input.disabled = true;
    lastTime = choiseData - Date.now();
    if (lastTime > 0) {
      convertMs(lastTime);

      const { days, hours, minutes, seconds } = newTime;

      elements.days.textContent = addLeadingZero(days);
      elements.hours.textContent = addLeadingZero(hours);
      elements.minutes.textContent = addLeadingZero(minutes);
      elements.seconds.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
      return Notiflix.Report.success('Good work!');
    }
  }, 1000);
}
function addLeadingZero(item) {
  return String(item).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return (newTime = { days, hours, minutes, seconds });
}
