'use strict'

const getRandomInteger = (min, max) => {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomFloat = (min, max, precision = 5) => {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
  }
};

const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const addLeadingZero = (num) => `0${num}`.slice(-2);

const getRandomArrayElements = (items) => {
  const elemets = [];
  for (let i = 0; i < items.length; i++) {
    if (Math.random() > 0.5) {
      elemets.push(items[i]);
    }
  }
  return elemets;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInteger, getRandomFloat, getRandomElement, getRandomArrayElements, addLeadingZero, isEscEvent};
