function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} | ${hours}:${minutes}`;
}

function showCurrentWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    3.6 * response.data.wind.speed
  );
}

function searchCurrentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "b409f6a940ab5609bc1ca05aa3fc68e6";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function search(city) {
  let apiKey = "b409f6a940ab5609bc1ca05aa3fc68e6";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", handleSubmit);

let LocationButton = document.querySelector("#location-button");
LocationButton.addEventListener("click", currentPosition);

search("Hamburg");
