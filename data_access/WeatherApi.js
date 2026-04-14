export default class WeatherApi {
    // Guarda la llave y la URL base para consultar el clima.
    constructor(apiKey) {
        this._apiKey = apiKey;
        this._baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    }

    // Obtiene el clima actual de unas coordenadas y lo adapta para la interfaz.
    async getWeather(lat, lon) {
        const url = `${this._baseUrl}?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric&lang=en`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();

        return {
            temperature: data.main?.temp ?? 0,
            condition: data.weather?.[0]?.main ?? "Unknown",
            description: data.weather?.[0]?.description ?? "No description",
            humidity: data.main?.humidity ?? 0,
            windSpeedKmh: Math.round((data.wind?.speed ?? 0) * 3.6)
        };
    }
}
