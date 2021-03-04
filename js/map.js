'use strict'

import {offers} from './data.js'

const disableForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const fieldsetForm = document.querySelectorAll('fieldset');
  const selectForm = document.querySelectorAll('.map__filter');
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  for (let i = 0; i < fieldsetForm.length; i++) {
    fieldsetForm[i].disabled = true;
  };
  for (let i = 0; i < selectForm.length; i++) {
    selectForm[i].disabled = true;
  }
}
disableForm();

const enableForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const fieldsetForm = document.querySelectorAll('fieldset');
  const selectForm = document.querySelectorAll('.map__filter');
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsetForm.length; i++) {
    fieldsetForm[i].removeAttribute('disabled');
  };
  for (let i = 0; i < selectForm.length; i++) {
    selectForm[i].removeAttribute('disabled');
  }
};
enableForm();

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm()
  })
.setView({
  lat: 35.6895,
  lng: 139.69171,
}, 12);

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
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('dragend', function () {
  document.getElementById('address').value = 'x: '  + mainPinMarker.getLatLng().lat + ', ' + 'y: ' + mainPinMarker.getLatLng().lng;
});

// mainPinMarker.on('moveend', (evt) => {
  // evt.target.getLatLng();
// });

const pointsOffers = offers;

pointsOffers.forEarch(({lat, lng}) => {
  const iconOffers = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      iconOffers,
    },
  );
  marker.addTo(map);
});

