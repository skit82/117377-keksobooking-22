'use strict'

// eslint-disable-next-line no-unused-vars

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// eslint-disable-next-line no-unused-vars

const getRandomFloat = function (min, max, precision = 2) {
  return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
}
