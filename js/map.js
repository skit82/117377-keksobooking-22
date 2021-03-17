'use strict'
/* global L:readonly */
// import {offers} from './data.js';
import {showPopup} from './card.js';
import {getData} from './app.js';

const MAX_OFFERS_COUNT = 10;

const disableForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const fieldsetForm = document.querySelectorAll('fieldset');
  const selectForm = document.querySelectorAll('.map__filter');
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  fieldsetForm.forEach((item) => {
    item.disabled = true;
  });
  selectForm.forEach((item) => {
    item.disabled = true;
  });
}
disableForm();

const enableForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const fieldsetForm = document.querySelectorAll('fieldset');
  const selectForm = document.querySelectorAll('.map__filter');
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  fieldsetForm.forEach((item) => {
    item.disabled = false;
  });
  selectForm.forEach((item) => {
    item.disabled = false;
  });
};

const map = L.map('map-canvas')
  .on('load', () => {
    getData((data) => {
      enableForm();
      renderOffers(data);
    });
  })
  .setView({
    lat: 35.66332,
    lng: 139.78141,
  },12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker (
  {
    lat: 35.66332,
    lng: 139.78141,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const precisionFloat = 5;
const inputAdress = document.querySelector('#address');
inputAdress.value = `${(mainPinMarker._latlng.lat).toFixed(precisionFloat)}, ${(mainPinMarker._latlng.lng).toFixed(precisionFloat)}`;

mainPinMarker.on('moveend', (evt) => {
  const latlng = evt.target.getLatLng();
  inputAdress.value = `${latlng.lat.toFixed(precisionFloat)}, ${latlng.lng.toFixed(precisionFloat)}`;
});

const renderOffers = (data) => {
  createMarkers(data);
};

const resetAddress = () => inputAdress.value = `${(mainPinMarker._latlng.lat).toFixed(precisionFloat)}, ${(mainPinMarker._latlng.lng).toFixed(precisionFloat)}`;

const createMarkers = (pointsOffers) => {
  const slicedOffersArray = pointsOffers.slice(0, MAX_OFFERS_COUNT);

  slicedOffersArray.forEach((pointOffer) => {
    const location = pointOffer.location;

    const iconOffers = L.icon({
      iconUrl: '/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const {lat, lng} = location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        iconOffers,
      },
    );
    marker
      .addTo(map)
      .bindPopup(() => showPopup(pointOffer));
  });
};

export {resetAddress, createMarkers};
