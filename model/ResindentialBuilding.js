import Building from "./Building.js";

export default class ResidentialBuilding extends Building {
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

    addResident(citizen) {

    }

    removeResident(citizenId) {

    }

    hasAvailableSpace() {
        return this._residents.length < this._capacity;
    }
}