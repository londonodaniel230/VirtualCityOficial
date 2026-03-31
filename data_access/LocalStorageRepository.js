export default class LocalStorageRepository {
    constructor(storageKey = "city-builder-save") {
        this._storageKey = storageKey;
    }

    get storageKey() {
        return this._storageKey;
    }

    save(data) {
        localStorage.setItem(this._storageKey, data);
    }

    load() {
        return localStorage.getItem(this._storageKey);
    }

    clear() {
        localStorage.removeItem(this._storageKey);
    }
}