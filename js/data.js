'use strict'

import {getRandomInteger, getRandomFloat, getRandomElement, getRandomArrayElements, addLeadingZero} from './utils.js';

const TITLES = ['Уютная квартира', 'Неуютная квартира', 'Красивый гостевой домик', 'Красивый гостевой домик у моря'];
const DESCRIPTIONS = ['Чистая и светлая', 'С хорошим видом из окон', 'Темное, не комфортное'];
const TYPES = ['bungalow', 'flat', 'house', 'palace'];
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOURS =['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const OFFERS_COUNT = 10;

const createOffer = function() {
  const locationX = getRandomFloat(35.65000, 35.70000);
  const locationY = getRandomFloat(139.7000, 139.80000);
  return {
    author: {
      avatar: 'img/avatars/user' + addLeadingZero(getRandomInteger(1, 8)) + '.png',
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
      photos: getRandomArrayElements(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const getOffers = (count) => {
  return new Array(count).fill(null).map(() => createOffer());
}
const offers = getOffers(OFFERS_COUNT);

export {offers};
