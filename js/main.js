'use strict'

const TITLES = ['Уютная квартира', 'Неуютная квартира', 'Красивый гостевой домик', 'Красивый гостевой домик у моря'];
const DESCRIPTIONS = ['Чистая и светлая', 'С хорошим видом из окон', 'Темное, не комфортное'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOURS =['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFERS_COUNT = 10;

const createOffer = function(i) {
  const locationX = getRandomFloat(35.65000, 35.70000);
  const locationY = getRandomFloat(139.7000, 139.80000);
  return {
    author: {
      avatar: 'img/avatars/user0' + addLeadingZero(i) + '.png',
    },
    offer: {
      title: TITLES[i],
      address: locationX + ',' + locationY,
      price: getRandomInteger(1000, 1000000),
      type: getIntegerValue(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 25),
      checkin: getIntegerValue(CHECKIN_HOURS),
      checkout: getIntegerValue(CHECKOUT_HOURS),
      features: getRandomArrayElements(FEATURES),
      description: DESCRIPTIONS[i],
      photos: [],
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const getRandomInteger = function (min, max) {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomFloat = function (min, max, precision = 5) {
  if (max <= min) {
    throw new Error('Max number less or equal number min');
  }else {
    return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
  }
};

const getIntegerValue = function(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

const addLeadingZero = (num) => '0${num}'.slice(-2);

const getRandomArrayElements = function (items) {
  const elemets = [];
  for (const i = 0; i < FEATURES.length; i++) {
    if (Math.random() > 0.5) {
      elemets.push(FEATURES[i]);
    }
  }
  return elemets;
};

const getOffers = new Array(OFFERS_COUNT).fill(null).map(() => createOffer());

