'use strict'
// import {offers} from './data.js'

const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
const IMG_ALT = 'Фотография жилья';

// const mapCardElement = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;

// const cardFragment = document.createDocumentFragment();

const createFeatureItem = (item) => {
  const featureItem = document.createElement('li');
  featureItem.classList.add('popup__feature');
  featureItem.classList.add('popup__feature--' + item);
  return featureItem;
}

const createPhotoElement = (item) => {
  const photoItem = document.createElement('img');
  photoItem.src = item;
  photoItem.width = IMG_WIDTH;
  photoItem.height = IMG_HEIGHT;
  photoItem.classList.add('popup__photo');
  photoItem.alt = IMG_ALT;
  return photoItem;
}

const createAndFillFragment = (array, render) => {
  const fragment = document.createDocumentFragment();
  array.forEach((item) => {
    fragment.appendChild(render(item));
  });
  return fragment;
}

const showPopup = ({author,offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const featuresItem = cardElement.querySelector('.popup__features');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const cardItemTypesElement = cardElement.querySelector('.popup__type');
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
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

  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  featuresItem.innerHTML = '';
  featuresItem.appendChild(createAndFillFragment(offer.features, createFeatureItem));
  cardElement.querySelector('.popup__description').textContent = offer.description;
  photosContainer.innerHTML = '';
  photosContainer.appendChild(createAndFillFragment(offer.photos, createPhotoElement));
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  // cardFragment.appendChild(cardElement);
  // mapCardElement.appendChild(cardFragment);

  return cardElement;
};

// export (showPopup(offers));
export {showPopup};
