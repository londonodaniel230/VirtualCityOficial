export default class WeatherView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(weatherData) {
        this._container.innerHTML = `
            <h3>Weather</h3>
            <p><strong>Condition:</strong> ${weatherData.condition}</p>
            <p><strong>Description:</strong> ${weatherData.description}</p>
            <p><strong>Temperature:</strong> ${weatherData.temperature} °C</p>
            <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
            <p><strong>Wind:</strong> ${weatherData.windSpeedKmh} km/h</p>
        `;
    }

    showError(message) {
        this._container.innerHTML = `
            <h3>Weather</h3>
            <p>${message}</p>
        `;
    }
}