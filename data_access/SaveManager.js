import LocalStorageRepository from "./LocalStorageRepository.js";

export default class SaveManager {
    constructor(repository = new LocalStorageRepository()) {
        this._repository = repository;
    }

    saveGame(cityState) {
        const jsonString = JSON.stringify(cityState, null, 2);
        this._repository.save(jsonString);
    }

    loadGame() {
        const savedData = this._repository.load();

        if (!savedData) {
            return null;
        }

        return JSON.parse(savedData);
    }

    clearSave() {
        this._repository.clear();
    }

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

    importGameFromJson(jsonText) {
        if (!jsonText) {
            return null;
        }

        return JSON.parse(jsonText);
    }
}