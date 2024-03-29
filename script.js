// Displays the current date and time

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
currentTime.innerHTML = `Last updated: ${day} ${hours}:${addZero(
  minutes
)}, </br> ${now.getDate()}${numberEnding} of ${month}`;

// Search engine

let cityForm = document.querySelector(".main-input-form");
cityForm.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-input");
  search(cityInput.value);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Weather and forecast API data

function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector(".current-temp");
  let city = document.querySelector("h1");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");

  mainTemp.innerHTML = temperature;
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = capitalizeFirstLetter(
    `${response.data.weather[0].description}`
  );
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}
// Timestamp on the forecast cards

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Display forecast cards

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-5">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
              <div class="card forecast-card text-center shadow p-3 mb-5 bg-body rounded">
                  <h5 class="card-title weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</h5>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" />
                  <div class="weather-forecast-temp">
                      <span class="weather-forecast-temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="weather-forecast-temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                  </div>
                  </p>
              </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Current Location button - Gets users GPS coordinates and displays and the city and current temperature using the OpenWeather API

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

// Top cities links

let weatherInKyiv = document.querySelector("#kyiv-link");
let weatherInLviv = document.querySelector("#lviv-link");
let weatherInZaporizhzhia = document.querySelector("#zaporizhzhia-link");
let weatherInDnipro = document.querySelector("#dnipro-link");

weatherInKyiv.addEventListener("click", () => {
  search("Kyiv");
});

weatherInLviv.addEventListener("click", () => {
  search("Lviv");
});

weatherInZaporizhzhia.addEventListener("click", () => {
  search((city = "Zaporizhzhia"));
});
weatherInDnipro.addEventListener("click", () => {
  search((city = "Dnipro"));
});

search("London");
