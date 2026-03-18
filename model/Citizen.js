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
    
    calculateHappiness () {

    }

    assignHouse (buildingId) {

    }

    removeHouse () {

    }

    assignJob (buildingId) {

    }

    removeJob () {

    }

}