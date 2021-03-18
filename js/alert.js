'use strict'

import {isEscEvent} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const mainPageElement = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showError = (err) => {
  const popupContainer = document.createElement('div');

  popupContainer.classList.add('popup-message');
  popupContainer.textContent = `Ошибка: ${err}. Попробуйте позднее`;
  mainPageElement.append(popupContainer);

  setTimeout(() => {
    popupContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onClose = (item) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      item.remove();
    }
  }
};

const showSuccessPopup = () => {
  const successElement = successTemplate.cloneNode(true);
  mainPageElement.appendChild(successElement);
  successElement.addEventListener('click', () => successElement.remove(), {once: true});
  window.addEventListener('keyup', onClose(successElement), {once: true});
};

const showErrorPopup = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const closeButtonElement = errorElement.querySelector('.error__button');
  mainPageElement.appendChild(errorElement);
  errorElement.addEventListener('click', () => errorElement.remove(), {once: true});
  closeButtonElement.addEventListener('click', () => errorElement.remove(), {once: true});
  window.addEventListener('keyup', onClose(errorElement), {once: true});
};

export {showError, showSuccessPopup, showErrorPopup};
