import getCityWeather from "./openWeather";
import domElments from "./domMiddleMan";

const places = require("places.js");
let currentUserCity = "london";

var placesAutocomplete = places({
  appId: "plS7X61ESP3G",
  apiKey: "ac24a5c7aad117e8c12eb6c0f4a8a8de",
  type: "city",
  templates: {
    value: function (suggestion) {
      return suggestion.name;
    },
  },
  container: document.querySelector("#address-input"),
}).configure({
  type: "address",
});

placesAutocomplete.on("change", function resultSelected(e) {
  currentUserCity = e.suggestion.city;
  loadCityWeatherData(currentUserCity);
  domElments.cityName.innerHTML = `Weather in ${currentUserCity}`;
});

function loadCityWeatherData() {
  domElments.cityName.innerHTML = `Weather in ${currentUserCity}`;
  getCityWeather(currentUserCity).then(appendDomData).catch(handleError);
}

function appendDomData(response) {
  console.log("loadCityWeatherData", response);

  domElments.temp.innerHTML = `${response.data.main.temp} °`;
  domElments.wind.innerHTML = `${response.data.wind.speed} km/h`;
  domElments.humid.innerHTML = `${response.data.main.humidity} %`;
}

function handleError(error) {
  console.log("handle Errors ", error);
}

loadCityWeatherData(currentUserCity);
