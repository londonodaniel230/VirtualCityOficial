export default class RankingView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(ranking) {
        if (!ranking || ranking.length === 0) {
            this._container.innerHTML = `
                <h3 class="panel-heading">Ranking</h3>
                <p class="panel-empty-state">No ranking data yet.</p>
            `;
            return;
        }

        this._container.innerHTML = `
            <h3 class="panel-heading">Top 10 Ranking</h3>
            <ol class="ranking-list">
                ${ranking.map((entry) => `
                    <li class="ranking-item">
                        <span class="ranking-city">${entry.cityName}</span>
                        <strong class="ranking-score">${entry.score}</strong>
                    </li>
                `).join("")}
            </ol>
        `;
    }
}
