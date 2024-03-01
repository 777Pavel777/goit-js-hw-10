import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import error from '../img/error.svg';
import check from '../img/check.svg';

let userSelectedDate;
let changeDateValue;
const inputValueTimer = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataValueDays = document.querySelector('span[data-days]');
const dataValueHours = document.querySelector('span[data-hours]');
const dataValueMinutes = document.querySelector('span[data-minutes]');
const dataValueSeconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
startBtn.style.backgroundColor = '#cfcfcf';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseHandler,
};

function onCloseHandler(selectedDates) {
  if (selectedDates[0] < Date.now()) {
    iziToast.show({
      iconUrl: error,
      title: 'Error',
      titleSize: 16,
      message: 'Please choose a date in the future',
      messageColor: '#ffffff',
      titleColor: '#ffffff',
      messageSize: 16,
      backgroundColor: '#EF4040',
      position: 'topRight',
      maxWidth: 800,
      close: false,
    });

    startBtn.disabled = true;
  }

  else {
    startBtn.disabled = false;
    startBtn.style.backgroundColor = '';
    userSelectedDate = selectedDates[0];
  }
}

const addLibrary = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimer() {
  const auditDate = userSelectedDate - new Date();
  if (auditDate <= 0) {
    clearInterval(changeDateValue);
    startBtn.disabled = false;
    inputValueTimer.disabled = false;
    inputValueTimer.classList.remove('input-check');
    return;
  }

  startBtn.disabled = true;
  inputValueTimer.disabled = true;
  inputValueTimer.classList.remove('input-check');

  const { days, hours, minutes, seconds } = convertMs(auditDate);

  dataValueDays.textContent = addLeadingZero(days);
  dataValueHours.textContent = addLeadingZero(hours);
  dataValueMinutes.textContent = addLeadingZero(minutes);
  dataValueSeconds.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.style.backgroundColor = '#cfcfcf';
   iziToast.show({
     iconUrl: check,
     title: 'OK',
     titleSize: 16,
     message: 'Timer on',
     messageColor: '#ffffff',
     titleColor: '#ffffff',
     messageSize: 16,
     backgroundColor: '#59A10D',
     position: 'topRight',
     maxWidth: 800,
     close: false,
   });
  updateTimer();
  changeDateValue = setInterval(updateTimer, 1000);
}
