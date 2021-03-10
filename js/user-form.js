'use strict'

const TIMES = ['12:00', '13:00', '14:00'];
const ROOMS = ['100', '3', '2', '1'];
const CAPACITIES = ['0', '3', '2', '1'];
const TYPES = ['bungalow', 'flat', 'house', 'palace'];
const PRICES = [0, 1000, 5000, 10000];

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const typeElement = document.querySelector('#type');
const priceInputElement = document.querySelector('#price');
const titleElement = document.querySelector('#title');
const roomCapacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');


const synchronizeFields = (firstElement, secondElement, firstValue, secondValue, callback) => {
  const firstElementChangeHandler = () => {
    const newFirstValue = secondValue[firstValue.indexOf(firstElement.value)];
    callback(secondElement, newFirstValue);
  };
  firstElement.addEventListener('change', firstElementChangeHandler);

  const secondElementChangeHandler = () => {
    const newSecondValue = firstValue[secondValue.indexOf(secondElement.value)];
    callback(firstElement, newSecondValue);
  };
  secondElement.addEventListener('change', secondElementChangeHandler);
};

const syncValue = (element, value) => {
  element.value = value;
};

synchronizeFields(timeInElement, timeOutElement, TIMES, TIMES, syncValue);

const syncValueWithMin = (element, value) => {
  element.min = value;
}

synchronizeFields(typeElement, priceInputElement, TYPES, PRICES, syncValueWithMin);

titleElement.addEventListener('invalid', () => {
  if (titleElement.validity.tooShort) {
    titleElement.setCustomValidity('Заголовок объявления должно иметь минимум 30-ть символов');
  } else if (titleElement.validity.tooLong ) {
    titleElement.setCustomValidity('Заголовок объявления не должен превышать  100-о символов');
  } else if (titleElement.validity.valueMissing) {
    titleElement.setCustomValidity('Обязательное поле');
  } else {
    titleElement.setCustomValidity('');
  }
});

priceInputElement.addEventListener('invalid', () => {
  if (priceInputElement.validity.rangeUnderflow) {
    priceInputElement.setCustomValidity('Минимальная цена: 1000');
  } else if (priceInputElement.validity.rangeOverflow){
    priceInputElement.setCustomValidity('Максимальная цена: 1000000');
  } else if (priceInputElement.validity.typeMismatch) {
    priceInputElement.setCustomValidity('Обязательное поле');
  } else {
    priceInputElement.setCustomValidity('');
  }
});

const disableRoomSelects = () => {
  for (let i = 0; i < roomCapacityElement.length; i++) {
    roomCapacityElement[i].disabled = true;
  }
};

const roomNumberChangeHandler = (evt) => {
  disableRoomSelects();
  const chooseValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < roomCapacityElement.length; i++) {
    if (roomCapacityElement[i].value === chooseValue) {
      roomCapacityElement[i].removeAttribute('disabled');
    } else if (roomCapacityElement[i].value <= chooseValue && roomCapacityElement[i].value < 0) {
      roomCapacityElement[i].removeAttribute('disabled');
    }
  }
};
roomNumberElement.addEventListener('change', roomNumberChangeHandler);
synchronizeFields(roomCapacityElement, roomNumberElement, ROOMS, CAPACITIES, syncValue);
