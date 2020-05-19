import getCityWeather from './openWeather';
import domElments from './domMiddleMan';

/* eslint import/no-unresolved: 2 */
const places = require('places.js');

let currentUserCity = 'london';
let currentTemperatureType = 'C';
let currentTemperature;

const placesAutocomplete = places({
  appId: 'plS7X61ESP3G',
  apiKey: 'ac24a5c7aad117e8c12eb6c0f4a8a8de',
  type: 'city',
  templates: {
    value(suggestion) {
      return suggestion.name;
    },
  },
  container: document.querySelector('#address-input'),
}).configure({
  type: 'address',
});

function appendDomData(response) {
  currentTemperature = Math.round(response.data.main.temp);
  domElments.temp.innerHTML = `${currentTemperature} ${currentTemperatureType}°`;
  domElments.wind.innerHTML = `${response.data.wind.speed} km/h`;
  domElments.humid.innerHTML = `${response.data.main.humidity} %`;
}

function swithTempreature() {
  if (currentTemperatureType === 'C') {
    currentTemperature = Math.round((currentTemperature * 9) / 5 + 32);
  } else {
    currentTemperature = Math.round(((currentTemperature - 32) * 5) / 9);
  }
  currentTemperatureType = (currentTemperatureType === 'C') ? 'F' : 'C';

  domElments.temp.innerHTML = `${currentTemperature} ${currentTemperatureType}°`;
}

function loadCityWeatherData() {
  domElments.cityName.innerHTML = `Weather in ${currentUserCity}`;
  getCityWeather(currentUserCity).then(appendDomData);
}

placesAutocomplete.on('change', (e) => {
  currentUserCity = (e.suggestion.city === undefined) ? e.suggestion.county : e.suggestion.city;
  loadCityWeatherData(currentUserCity);
  domElments.cityName.innerHTML = `Weather in ${currentUserCity}`;
});

domElments.switcher.addEventListener('click', swithTempreature);
loadCityWeatherData(currentUserCity);
