import Building from "./Building.js";

export default class ResidentialBuilding extends Building {
    // Crea un edificio residencial con capacidad para alojar ciudadanos.
    constructor(
        id,
        name,
        type,
        constructionCost,
        maintenanceCost,
        electricityConsumption,
        waterConsumption,
        capacity
    ) {
        super(
            id,
            name,
            type,
            "residential",
            constructionCost,
            maintenanceCost,
            electricityConsumption,
            waterConsumption
        );

        this._capacity = capacity;
        this._residents = [];
    }

    get capacity() {
        return this._capacity;
    }

    get residents() {
        return this._residents;
    }

    set capacity(newCapacity) {
        this._capacity = newCapacity;
    }

    set residents(newResidents) {
        this._residents = newResidents;
    }

    // Agrega un residente si aun queda espacio disponible.
    addResident(citizen) {
        if (!this.hasAvailableSpace()) {
            return false;
        }

        this._residents.push(citizen);
        return true;
    }

    // Elimina un residente segun su identificador.
    removeResident(citizenId) {
        this._residents = this._residents.filter((resident) => resident.id !== citizenId);
    }

    // Indica si el edificio todavia puede recibir mas residentes.
    hasAvailableSpace() {
        return this._residents.length < this._capacity;
    }
}
