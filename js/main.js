'use strict'

const getRandomInteger = function (min, max) {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

alert(getRandomInteger(1,3));

const getRandomFloat = function (min, max, precision = 2) {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
  }
};

alert(getRandomFloat(1,2));
