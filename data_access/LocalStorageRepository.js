export default class LocalStorageRepository {
    // Define la clave que se usara para guardar la partida en el navegador.
    constructor(storageKey = "city-builder-save") {
        this._storageKey = storageKey;
    }

    get storageKey() {
        return this._storageKey;
    }

    // Guarda un texto en localStorage usando la clave configurada.
    save(data) {
        localStorage.setItem(this._storageKey, data);
    }

    // Recupera el texto guardado en localStorage.
    load() {
        return localStorage.getItem(this._storageKey);
    }

    // Elimina la partida guardada de localStorage.
    clear() {
        localStorage.removeItem(this._storageKey);
    }
}
