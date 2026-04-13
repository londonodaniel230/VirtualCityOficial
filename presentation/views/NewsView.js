export default class NewsView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

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

    showError(message) {
        this._container.innerHTML = `
            <h3 class="panel-heading">News</h3>
            <p class="panel-empty-state">${message}</p>
        `;
    }
}
