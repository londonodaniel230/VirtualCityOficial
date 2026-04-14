export default class NewsApi {
    // Guarda la llave y la URL base para consultar noticias.
    constructor(apiKey) {
        this._apiKey = apiKey;
        this._baseUrl = "https://newsapi.org/v2/top-headlines";
    }

    // Obtiene los titulares principales de un pais y los normaliza para la vista.
    async getTopHeadlines(countryCode) {
        const url = `${this._baseUrl}?country=${countryCode}&pageSize=5`;

        const response = await fetch(url, {
            headers: {
                "X-Api-Key": this._apiKey
            }
        });

        const data = await response.json();

        if (!response.ok || data.status !== "ok") {
            throw new Error(data.message || "Failed to fetch news.");
        }

        return data.articles.map((article) => ({
            title: article.title ?? "No title",
            description: article.description ?? "No description available.",
            image: article.urlToImage ?? "",
            url: article.url ?? "#"
        }));
    }

    // Busca noticias por texto libre cuando no hay titulares suficientes.
    async searchNews(query) {
        const url = `${this._baseUrl}?q=${encodeURIComponent(query)}&pageSize=5&apiKey=${this._apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.status !== "ok") {
            throw new Error(data.message || "Failed to fetch news.");
        }

        return data.articles.map((article) => ({
            title: article.title ?? "No title",
            description: article.description ?? "No description available.",
            image: article.urlToImage ?? "",
            url: article.url ?? "#"
        }));
    }
}
