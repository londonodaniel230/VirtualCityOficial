export default class RankingView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(ranking) {
        if (!ranking || ranking.length === 0) {
            this._container.innerHTML = `
                <h3>Ranking</h3>
                <p>No ranking data yet.</p>
            `;
            return;
        }

        this._container.innerHTML = `
            <h3>Top 10 Ranking</h3>
            <ol class="ranking-list">
                ${ranking.map((entry) => `
                    <li class="ranking-item">
                        <span>${entry.cityName}</span>
                        <strong>${entry.score}</strong>
                    </li>
                `).join("")}
            </ol>
        `;
    }
}