'use strict'

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = function (min, max, precision = 2) {
  return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
}
