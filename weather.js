document.getElementById("search-btn").addEventListener("click", function () {
  const city= document.getElementById("city-input").ariaValueMax.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiKey = "YOUR";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl).then(response => response.json()).then(data => {
    if (data.cod !== "200") {
      alert("City not found or error fetching data.")
      return;
    }
    displayForecast(data);
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    alert("Error fetchng weather data.");
  });
});

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = ""; //clear previous results

  //We will group the data by date (one forecast per day)
  const forecastByDate = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!forecastByDate[date]) {
      forecastByDate[date] = [];
    }
    forecastByDate[date].push(item);
  });

  // For each day, we can take the forecast at noon (approx)
  for (let date in forecastByDate) {
    //Find the forecast closest to 12:00:00
    const forecasts = forecastByDate[date];
    let noonForecast = forecasts.reduce((prev, curr) => {
      return Math.abs(new Date(curr.dt_txt).getHours()-12) < Math.abs(new Date(prev.dt_txt).getHours() - 12)
      ? curr: prev;
    });

    // Create a card for this forecast
    const card = document.createElement("div");
    card.className = "forecast-card";

    const dateOptions = { weekday: 'long',month: 'long',day: 'numeric'};
    const forecastDate = new Date(noonForecast.dt_txt).toLocaleDateString(undefined, dateOptions);

    card.innerHTML = `
    <h3>${forecastDate}</h3>
    <p><strong>Temperature:</strong> ${noonForecast.main.temp.toFixed(1)} degree C</p>
    <p><strong>Weather:</strong> ${noonForecast.weather[0].main} (${noonForecast.weather[0].description})</p>
    <p><strong>Humidity:</strong> ${noonForecast.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${noonForecast.wind.speed} m/s</p>
    `;

    forecastContainer.appendChild(card);
  }
}