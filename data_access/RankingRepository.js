export default class RankingRepository {
    constructor(storageKey = "city-builder-ranking") {
        this._storageKey = storageKey;
    }

    loadRanking() {
        const data = localStorage.getItem(this._storageKey);

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    }

    saveRanking(ranking) {
        localStorage.setItem(this._storageKey, JSON.stringify(ranking, null, 2));
    }

    addScore(entry) {
        const ranking = this.loadRanking();

        const existingIndex = ranking.findIndex(
            (item) => item.cityName === entry.cityName
        );

        if (existingIndex !== -1) {
            if (entry.score > ranking[existingIndex].score) {
                ranking[existingIndex] = entry;
            }
        } else {
            ranking.push(entry);
        }

        ranking.sort((a, b) => b.score - a.score);

        const top10 = ranking.slice(0, 10);
        this.saveRanking(top10);

        return top10;
    }

    clearRanking() {
        localStorage.removeItem(this._storageKey);
    }
}