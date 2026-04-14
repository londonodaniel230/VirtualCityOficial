export default class NewsView {
    // Guarda el contenedor donde se mostraran las noticias.
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    // Renderiza la lista de noticias o un mensaje vacio si no hay resultados.
    render(newsItems) {

        if (!newsItems || newsItems.length === 0) {
            this._container.innerHTML = `
                <h3 class="panel-heading">News</h3>
                <p class="panel-empty-state">No news available.</p>
            `;
            return;
        }

        this._container.innerHTML = `
            <h3 class="panel-heading">News</h3>
            <div class="news-list">
                ${newsItems.map((item) => `
                    <article class="news-item">
                        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="news-image">` : ""}
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read more</a>
                    </article>
                `).join("")}
            </div>
        `;
    }

    // Muestra un mensaje de error en el panel de noticias.
    showError(message) {
        this._container.innerHTML = `
            <h3 class="panel-heading">News</h3>
            <p class="panel-empty-state">${message}</p>
        `;
    }
}
