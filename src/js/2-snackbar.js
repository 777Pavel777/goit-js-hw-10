import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', showPromise);

function showPromise(event) {
  event.preventDefault();

  const delay = formElement.elements.delay.value;
  const radioValue = formElement.elements.state.value;

  function myPromise(time, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'fulfilled') {
          resolve(time);
        }
        reject(time);
      }, delay);
      formElement.reset();
    });
  }

  myPromise(delay, radioValue)
    .then(success => {
      iziToast.success({
        icon: false,
        message: `✅ Fulfilled promise in ${success}ms`,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        messageSize: 14,
        backgroundColor: '#59A10D',
        position: 'topRight',
        maxWidth: 902,
        close: false,
      });
    })
    .catch(error => {
      iziToast.error({
        icon: false,
        message: `❌ Rejected promise in ${error}ms`,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        messageSize: 14,
        backgroundColor: '#de3c3c',
        position: 'topRight',
        maxWidth: 902,
        close: false,
      });
    });
}
