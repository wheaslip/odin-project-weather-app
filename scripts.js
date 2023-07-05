// Author: Wesley Heaslip

// Trigger click event on button when enter key is pressed in input field
const inputField = document.querySelector("#city");
inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("#submit").click();
    }
    }
);

// Get weather information for city when submit button is clicked
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async function () {
  event.preventDefault(); // Needed to prevent page reloading from default form behaviour.
  let rawWeatherData = await getData(document.querySelector("#city").value);
  const weatherData = extractUsefulWeatherData(rawWeatherData);
  displayWeatherData(weatherData);
  inputField.value = "";
});

async function getData(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=9f16e2ea82e94399ad4145632230407&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// Takes a JSON with all the weather data and produces an object
// just the relevant data for this site.
function extractUsefulWeatherData(weatherJSON) {
  const weatherData = {
    city: weatherJSON.location.name,
    country: weatherJSON.location.country,
    region: weatherJSON.location.region,
    temperature: weatherJSON.current.temp_c,
    condition: weatherJSON.current.condition.text,
    icon: `https:${weatherJSON.current.condition.icon}`,
    windSpeed: weatherJSON.current.wind_kph,
    windDirection: weatherJSON.current.wind_dir,
    humidity: weatherJSON.current.humidity,
    feelsLike: weatherJSON.current.feelslike_c,
    uvIndex: weatherJSON.current.uv,
    visibility: weatherJSON.current.vis_km,
    lastUpdated: weatherJSON.current.last_updated,
  };
  return weatherData;
}

// Takes an object with the relevant weather related key:value pairs
// and display the information on the page.
function displayWeatherData(weatherData) {
  document.querySelector("#icon").src = weatherData.icon;
  document.querySelector("#location").innerHTML = `${weatherData.city}, ${weatherData.country}`;
  document.querySelector("#temperature").innerHTML = weatherData.temperature;
  document.querySelector("#condition").innerHTML = weatherData.condition;
  document.querySelector("#windSpeed").innerHTML = weatherData.windSpeed;
  document.querySelector("#windDirection").innerHTML =weatherData.windDirection;
  document.querySelector("#feelsLike").innerHTML = weatherData.feelsLike;
}


async function initializePageWithDefaultCity() {
  let rawWeatherData = await getData("Toronto");
  const weatherData = extractUsefulWeatherData(rawWeatherData);
  displayWeatherData(weatherData);
}

initializePageWithDefaultCity();

