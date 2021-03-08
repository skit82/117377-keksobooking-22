'use strict'

const TIMES = ['12:00', '13:00', '14:00'];
const TYPES = ['bungalow', 'flat', 'house', 'palace'];
const PRICES = [0, 1000, 5000, 10000];

const timeIN = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const type = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const title = document.querySelector('#title');
const roomCapacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');


const synchronizeFields = (firstElement, secondElement, firstValue, secondValue, callback) => {
  const firstElementChangeHandler = () => {
    const newFirstValue = secondValue[firstValue.indexOf(firstElement.value)];
    callback(secondElement, newFirstValue);
  };
  firstElement.addEventListener('change', firstElementChangeHandler);

  const secondElementChangeHandler = () => {
    const newSecondValue = firstValue[secondValue.indexOf(secondElement.value)];
    callback(firstElement, newSecondValue);
  };
  secondElement.addEventListener('change', secondElementChangeHandler);
};

const syncValue = (element, value) => {
  element.value = value;
};

synchronizeFields(timeIN, timeOut, TIMES, TIMES, syncValue);

const syncValueWithMin = (element, value) => {
  element.min = value;
}

synchronizeFields(type, priceInput, TYPES, PRICES, syncValueWithMin);

const titleInvalidHandler = () => {
  if (title.validity.tooShort && title.validity.tooLong && title.validity.valueMissing) {
    title.setAttribute('style', 'border-color: red');
  } else {
    title.setCustomValidity('');
    title.removeAttribute('style');
  }
};
title.addEventListener('invalid', titleInvalidHandler);

const priceInputInvalidHander = () => {
  if (priceInput.validity.rangeUnderflow && priceInput.validity.rangeOverflow && priceInput.validity.typeMismatch) {
    priceInput.setAttribute('stile', 'border-color: red');
  } else {
    priceInput.removeAttribute('style');
  }
}
priceInput.addEventListener('invalid', priceInputInvalidHander);

const disableRoomSelects = () => {
  for (let i = 0; i < roomCapacity.length; i++) {
    roomCapacity[i].disabled = true;
  }
};

const roomNumberChangeHandler = (evt) => {
  disableRoomSelects();
  const chooseValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < roomCapacity.length; i++) {
    if (roomCapacity[i].value === chooseValue) {
      roomCapacity[i].removeAttribute('disabled');
    }
    if (roomCapacity[i].value <= chooseValue && roomCapacity[i].value > 0) {
      roomCapacity[i].removeAttribute('disabled');
    }
  }
};
roomNumber.addEventListener('change', roomNumberChangeHandler);
