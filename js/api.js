'use strict'

import {showError} from './alert.js';

const getData = (onSuccess) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        showError(`${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(data => onSuccess(data))
    .catch(err => showError(err));
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.ok ? onSuccess() : onFail())
    .catch(() => onFail());
};

export {getData, sendData};
