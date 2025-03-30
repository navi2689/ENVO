document.getElementById("search-btn").addEventListener("click", function () {
  let city = document.getElementById("city").value.trim(); // Corrected property

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  let apiKey = "6e73d9b8efa52d156e9fce9b2935f698b083fe85";
  let apiURL = `https://api.waqi.info/feed/${city}/?token=${apiKey}`;

  fetch(apiURL).then(response => response.json()).then(data => {
    if (data.status === "error") {
      alert("City not found or API limit exceeded.");
      return;
    }

    let aqi = data.data.aqi;
    let cityName = data.data.city.name;

    document.getElementById("location").innerText = `City: ${cityName}`;
    document.getElementById("aqi-value").innerText = `AQI: ${aqi}`;
    document.getElementById("status").innerText = `Status: ${getAQIStatus(aqi)}`;

    let resultBox = document.querySelector(".aqi-result");
    resultBox.className = "aqi-result " + getAQIColorClass(aqi); // Added space before concatenating
  })
  .catch(error => {
    alert("An error occurred while fetching AQI data.");
    console.error(error);
  });
});

// Function to determine AQI status
function getAQIStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"; // Fixed typo
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

// Function to return AQI color class
function getAQIColorClass(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthy-sensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very-unhealthy";
  return "hazardous";
}
