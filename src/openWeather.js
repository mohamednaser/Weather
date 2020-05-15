const axios = require("axios");
const appID = "8aedef77b7c96cb9f3cf8d7b2e9c9012";

function getCityWeather(city = "london") {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${appID}`
  );
}

export default getCityWeather;
