export default class RouteApi {
    constructor(baseUrl = "http://127.0.0.1:5000") {
        this._baseUrl = baseUrl;
    }

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