import Building from "./Building.js";

export default class ResidentialBuilding extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, capacity) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._capacity = capacity;
        this._residents = [];
    }

    // ======= GETTERS =======
    get capacity () { 
        return this._capacity; 
    }

    get residents () { 
        return this._residents; 
    }

    // ======= SETTERS =======

    set capacity (newCapacity) { 
        this._capacity = newCapacity; 
    }

    set residents (newResidents) { 
        this._residents = newResidents; 
    }

    // ======= METHODS =======
    
    addResident (citizen) {

    }

    removeResident (citizenId) {

    }

    hasAvailableSpace () {

    }

}