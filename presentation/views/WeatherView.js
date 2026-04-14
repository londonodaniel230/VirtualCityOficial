export default class WeatherView {
    // Guarda el contenedor donde se mostrara el clima.
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    // Muestra los datos del clima actual en el panel lateral.
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

    // Muestra un mensaje de error en el panel del clima.
    showError(message) {
        this._container.innerHTML = `
            <h3 class="panel-heading">Weather</h3>
            <p class="panel-empty-state">${message}</p>
        `;
    }
}
