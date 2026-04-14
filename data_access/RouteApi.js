export default class RouteApi {
    // Guarda la URL base del servicio externo que calcula rutas.
    constructor(baseUrl = "http://127.0.0.1:5000") {
        this._baseUrl = baseUrl;
    }

    // Envia el mapa y dos puntos al backend para obtener la ruta calculada.
    async calculateRoute(map, start, end) {
        const response = await fetch(`${this._baseUrl}/api/calculate-route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                map,
                start,
                end
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to calculate route.");
        }

        return data;
    }
}
