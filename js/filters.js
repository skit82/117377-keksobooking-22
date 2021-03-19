'use strict'

import {MAX_OFFERS_COUNT, createMarkers, removeMarkers} from './map.js';
import {debounce} from './utils.js';

const NO_FILTER = 'any';
const LOW_PRICE = {max: 10000};
const MIDDLE_PRICE = {min: 10000, max: 50000};
const HIGH_PRICE = {min: 50000};
const RERENDER_DELAY = 500;

const filtersFormElement = document.querySelector('.map__filters');

const filtersHandler = (offersArray) => {
  const onFiltersFormChange = () => {
    const typeFilterValue = filtersFormElement.querySelector('#housing-type').value;
    const priceFilterValue = filtersFormElement.querySelector('#housing-price').value;
    const roomsFilterValue = filtersFormElement.querySelector('#housing-rooms').value;
    const guestsFilterValue = filtersFormElement.querySelector('#housing-guests').value;
    const featureFilters = filtersFormElement.querySelectorAll('.map__checkbox:checked');

    const isOfferMatchFilter = (filterValue, offerKey) => {
      if (filterValue === NO_FILTER) {
        return true;
      } else {
        return filterValue === String(offerKey);
      }
    };

    const isOfferMatchPrice = (offerPrice) => {
      switch (priceFilterValue) {
        case NO_FILTER:
          return true;
        case 'low':
          return offerPrice <= LOW_PRICE.max ? true : false;
        case 'middle':
          return offerPrice >= MIDDLE_PRICE.min && offerPrice <= MIDDLE_PRICE.max ? true : false;
        case 'high':
          return offerPrice >= HIGH_PRICE.min ? true : false;
        default:
          return false;
      }
    };

    const isOfferMatchFeatures = (offerFeatures) => {
      const featureFiltersValue = Array
        .from(featureFilters)
        .map(feature => feature.value);

      let result = true;
      featureFiltersValue.forEach((value) => {
        if (!offerFeatures.includes(value)) {
          result = false;
        }
      });
      return result;
    };

    const sortingByType = ({offer}) => isOfferMatchFilter(typeFilterValue, offer.type);
    const sortingByPrice = ({offer}) => isOfferMatchPrice(offer.price);
    const sortingByRooms = ({offer}) => isOfferMatchFilter(roomsFilterValue, offer.rooms);
    const sortingByGuests = ({offer}) => isOfferMatchFilter(guestsFilterValue, offer.guests);
    const sortingByFeatures = ({offer}) => isOfferMatchFeatures(offer.features);

    const sortedOfferArray = offersArray
      .filter(sortingByType)
      .filter(sortingByPrice)
      .filter(sortingByRooms)
      .filter(sortingByGuests)
      .filter(sortingByFeatures)
      .slice(0, MAX_OFFERS_COUNT);
    removeMarkers();
    createMarkers(sortedOfferArray);
  };

  const onFiltersFormDebouncedChange = debounce(onFiltersFormChange, RERENDER_DELAY);

  const onfiltersFormReset = () => {
    removeMarkers();
    createMarkers(offersArray);
  };

  filtersFormElement.addEventListener('change', onFiltersFormDebouncedChange);
  filtersFormElement.addEventListener('reset', onfiltersFormReset);
};

export {filtersHandler, filtersFormElement};
