import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const myPromise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  myPromise
    .then(delay => {
      setTimeout(() => {
        iziToast.success({
          icon: false,
          message: `✅ Fulfilled promise in ${delay}ms`,
          messageColor: '#ffffff',
          titleColor: '#ffffff',
          messageSize: 14,
          backgroundColor: '#59A10D',
          position: 'topRight',
          maxWidth: 902,
          close: false,
        });
      }, delay);
    })
    .catch(delay => {
      setTimeout(() => {
        iziToast.error({
          icon: false,
          message: `❌ Rejected promise in ${delay}ms`,
          messageColor: '#ffffff',
          titleColor: '#ffffff',
          messageSize: 14,
          backgroundColor: '#de3c3c',
          position: 'topRight',
          maxWidth: 902,
          close: false,
        });
      }, delay);
    });
});
