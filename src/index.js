import getCityWeather from "./openWeather";

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
  getCityWeather(currentUserCity).then(loadCityWeatherData).catch(handleError);
});

function loadCityWeatherData(response) {
  console.log(response.data, "weather data");
}

function handleError(error) {
  console.log("handle Errors ", error);
}
