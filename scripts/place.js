const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperature = 10;
const windSpeed = 5;
const temperatureDisplay = document.querySelector("#temperature");
const windSpeedDisplay = document.querySelector("#windSpeed");
const windChill = document.querySelector("#windChill");

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
temperatureDisplay.textContent = temperature;
windSpeedDisplay.textContent = windSpeed;

windChill.textContent =
  temperature <= 10 && windSpeed > 4.8
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00b0C`
    : "N/A";
