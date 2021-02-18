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
      avatar: 'img/avatars/user' + addLeadingZero(i) + '.png',
    },
    offer: {
      title: getRandomElement(TITLES),
      address: locationX + ',' + locationY,
      price: getRandomInteger(1000, 1000000),
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 25),
      checkin: getRandomElement(CHECKIN_HOURS),
      checkout: getRandomElement(CHECKOUT_HOURS),
      features: getRandomArrayElements(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: [],
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

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

const getOffers = (count) => {
  return new Array(count).fill(null).map(() => createOffer());
}
const offers = getOffers(OFFERS_COUNT);
alert(offers);
