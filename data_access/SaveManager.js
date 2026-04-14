import LocalStorageRepository from "./LocalStorageRepository.js";

export default class SaveManager {
    // Usa un repositorio para centralizar el guardado y la carga de partidas.
    constructor(repository = new LocalStorageRepository()) {
        this._repository = repository;
    }

    // Convierte el estado de la ciudad a JSON y lo guarda.
    saveGame(cityState) {
        const jsonString = JSON.stringify(cityState, null, 2);
        this._repository.save(jsonString);
    }

    // Carga una partida guardada y la devuelve como objeto.
    loadGame() {
        const savedData = this._repository.load();

        if (!savedData) {
            return null;
        }

        return JSON.parse(savedData);
    }

    // Elimina la partida guardada actualmente.
    clearSave() {
        this._repository.clear();
    }

    // Exporta la partida actual como un archivo JSON descargable.
    exportToJson(cityState) {
        const jsonString = JSON.stringify(cityState, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "city-save.json";
        link.click();

        URL.revokeObjectURL(url);
    }

    // Convierte el texto de un archivo JSON importado en un objeto de partida.
    importGameFromJson(jsonText) {
        if (!jsonText) {
            return null;
        }

        return JSON.parse(jsonText);
    }
}
