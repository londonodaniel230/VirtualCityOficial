export default class WeatherView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(weatherData) {
        this._container.innerHTML = `
            <h3 class="panel-heading">Weather</h3>
            <div class="info-stat-list">
                <div class="info-stat-row">
                    <span>Condition</span>
                    <strong>${weatherData.condition}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Description</span>
                    <strong>${weatherData.description}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Temperature</span>
                    <strong>${weatherData.temperature} C</strong>
                </div>
                <div class="info-stat-row">
                    <span>Humidity</span>
                    <strong>${weatherData.humidity}%</strong>
                </div>
                <div class="info-stat-row">
                    <span>Wind</span>
                    <strong>${weatherData.windSpeedKmh} km/h</strong>
                </div>
            </div>
        `;
    }

    showError(message) {
        this._container.innerHTML = `
            <h3 class="panel-heading">Weather</h3>
            <p class="panel-empty-state">${message}</p>
        `;
    }
}
