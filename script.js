/* 
⏰Feature #1
Display the current date and time using JavaScript.

🕵️‍♀️Feature #2
Search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius. */

// Feature 1
let now = new Date();
let day = now.getDay();
let month = now.getMonth();
let hours = now.getHours();
let minutes = now.getMinutes();

function addZero(minutes) {
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
month = months[now.getMonth()];

let ending = ["st", "nd", "rd", "th"];
let numberEnding;
if (now.getDate() === 1 || now.getDate() === 21 || now.getDate() === 31) {
  numberEnding = ending[0];
}
if (now.getDate() === 2 || now.getDate() === 22) {
  numberEnding = ending[1];
}
if (now.getDate() === 3 || now.getDate() === 23) {
  numberEnding = ending[2];
}
if (
  (now.getDate() >= 4 && now.getDate() <= 20) ||
  (now.getDate() >= 24 && now.getDate() <= 30)
) {
  numberEnding = ending[3];
}

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${day} ${hours}:${addZero(
  minutes
)}, </br> ${now.getDate()}${numberEnding} of ${month}`;

// Feature 2
let city = document.querySelector("h1");

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-input");
  city.innerHTML = `${cityInput.value}`;
}

let cityForm = document.querySelector(".main-input-form");
cityForm.addEventListener("submit", changeCity && getLocation);

// Feature 3 - Temperature conversion
/* let currentTemp = document.querySelector(".current-temp");

function changeToCelcius(event) {
  event.preventDefault();
  currentTemp.innerHTML = 18;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round((18 * 9) / 5 + 32);
}

let celcius = document.querySelector(".celcius");
let fahrenheit = document.querySelector(".fahrenheit");

celcius.addEventListener("click", changeToCelcius);
fahrenheit.addEventListener("click", changeToFahrenheit);*/

/* 
In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course. */

function getLocation(event) {
  event.preventDefault();
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let cityInput = document.querySelector(".city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemperature);
}

/*
Add a Current Location button. 
When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API. */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);

  let mainTemp = document.querySelector(".current-temp");
  mainTemp.innerHTML = temperature;

  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = capitalizeFirstLetter(
    `${response.data.weather[0].description}`
  );

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemperature);
}

function changeToCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("button.current");
currentButton.addEventListener("click", changeToCurrent);
