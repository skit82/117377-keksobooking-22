'use strict'

const TIMES = ['12:00', '13:00', '14:00'];
const TYPES = ['bungalow', 'flat', 'house', 'palace'];
const PRICES = [0, 1000, 5000, 10000];

const timeIN = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const type = document.querySelector('#type');
const priceInput = document.querySelector('#price');

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

