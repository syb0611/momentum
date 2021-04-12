const API_KEY = "f0d7f1d0087c14aae91c23b728b67183";
const COORDS = "coords";
const weather = document.querySelector(".weather");
const weather__icon = weather.querySelector(".weather__icon");
const weather__temperature = weather.querySelector(".weather__temperature");
const weather__description = weather.querySelector(".weather__description");
const weather__location = weather.querySelector(".weather__location");

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        const temp = json.main.temp;
        const city = json.name;
        const country = json.sys.country;
        const description = json.weather[0].description;
        const iconId = json.weather[0].icon;

        weather__icon.innerHTML = `<img src="img/icon/${iconId}.png" />`;
        weather__temperature.innerHTML = `<span>${temp}°</span>C`;
        weather__description.innerHTML = `${description}`;
        weather__location.innerHTML = `<i class="fas fa-map-marker-alt"></i>${city}, ${country}`;

    });
}

function saveCoords(coordObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(position) {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();