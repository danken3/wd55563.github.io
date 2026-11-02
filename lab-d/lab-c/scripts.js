const API_KEY = "acd3aa42ddf1750179ec53f93957ca98";

function getWeather() {

  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Podaj miasto!");
    return;
  }

  loadCurrentWeather(city);
  loadForecast(city);
}

function loadCurrentWeather(city) {

  const xhr = new XMLHttpRequest();

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  xhr.open("GET", url, true);

  xhr.onload = function () {

    const data = JSON.parse(xhr.responseText);

    console.log("Current Weather:");
    console.log(data);

    document.getElementById("currentWeather").innerHTML =
      `
            <h2>${data.name}</h2>
            <p>Temperatura: ${data.main.temp} °C</p>
            <p>Pogoda: ${data.weather[0].description}</p>
            <p>Wilgotność: ${data.main.humidity}%</p>
            <p>Wiatr: ${data.wind.speed} m/s</p>
            `;
  };

  xhr.send();
}

async function loadForecast(city) {

  const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    console.log("Forecast:");
    console.log(data);

    const container =
      document.getElementById("forecastContainer");

    container.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {

      const forecast = data.list[i];

      container.innerHTML += `
                <div class="forecast-card">
                    <h3>${forecast.dt_txt.split(" ")[0]}</h3>
                    <p>${forecast.main.temp} °C</p>
                    <p>${forecast.weather[0].description}</p>
                </div>
            `;
    }

  } catch (error) {
    console.error(error);
  }
}
