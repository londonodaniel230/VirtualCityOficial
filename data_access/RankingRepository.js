export default class RankingRepository {
    // Define la clave donde se almacenara el ranking en el navegador.
    constructor(storageKey = "city-builder-ranking") {
        this._storageKey = storageKey;
    }

    // Carga el ranking guardado o devuelve una lista vacia si no existe.
    loadRanking() {
        const data = localStorage.getItem(this._storageKey);

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    }

    // Guarda el ranking completo en localStorage.
    saveRanking(ranking) {
        localStorage.setItem(this._storageKey, JSON.stringify(ranking, null, 2));
    }

    // Agrega o actualiza una ciudad en el ranking y conserva solo el top 10.
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

    // Borra el ranking almacenado en el navegador.
    clearRanking() {
        localStorage.removeItem(this._storageKey);
    }
}
