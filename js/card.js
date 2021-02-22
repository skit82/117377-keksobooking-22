'use strict'
import {offers} from './data.js'

const mapCardElement = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popur');

const cardOffers = offers;

const cardFragment = document.createDocumentFragment();

cardOffers.forEach(({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardItemTypesElement = cardElement.querySelector('popup__type');
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  switch (offer.type) {
    case 'flat':
      cardItemTypesElement.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardItemTypesElement.textContent = 'Бунгало';
      break;
    case 'house':
      cardItemTypesElement.textContent = 'Дом';
      break;
    case 'palace':
      cardItemTypesElement.textContent = 'Дворец';
      break;
  }

  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + 'комнаты для' + offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.checkin + ',выезд до' + offer.checkout;

  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').src = offer.photos;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardFragment.appendChild(cardElement);
});
mapCardElement.appendChild(cardFragment);
