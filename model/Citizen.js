export default class Citizen {

    constructor (id) {
        this._id = id;
        this._happiness = 50;
        this._hasHouse = false;
        this._hasEmployment = false;
    }

    // ======= GETTERS =======

    get id () { 
        return this._id; 
    }

    get happiness () { 
        return this._happiness; 
    }

    get hasHouse () { 
        return this._hasHouse; 
    }

    get hasEmployment () { 
        return this._hasEmployment; 
    }

    // ======= SETTERS =======

    set id (newId) { 
        this._id = newId; 
    }

    set happiness (newHappiness) { 
        this._happiness = newHappiness; 
    }

    set hasHouse (newHasHouse) { 
        this._hasHouse = newHasHouse; 
    }

    set hasEmployment (newHasEmployment) { 
        this._hasEmployment = newHasEmployment; 
    }

    // ======= METHODS =======
    
    calculateHappiness (cityBaseHappiness = 50) {
        let total = cityBaseHappiness;

        // Vivienda
        if (this._hasHouse) {
            total += 20;
        } else {
            total -=20;
        }

        // Empleo
        if (this._hasEmployment) {
            total += 15;
        } else {
            total -= 15;
        }

        // Minimo 0
        if (total < 0) {
            total = 0;
        }

        this._happiness = total;

        return this._happiness;
    }

    assignHouse (buildingId) {
        this._hasHouse = true;
        this._houseId = buildingId;
    }

    removeHouse () {
        this._hasHouse = false;
        this._houseId = null;
    }

    assignJob (buildingId) {
        this.hasEmployment = true;
        this._jobId = buildingId;
    }

    removeJob () {
        this._hasEmployment= false;
        this._jobId = null;
    }

}