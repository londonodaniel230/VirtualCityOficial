export default class Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption) {
        this._id = id;
        this._constructionCost = constructionCost;
        this._maintenanceCost = maintenanceCost;
        this._electricityConsumption = electricityConsumption;
        this._waterConsumption = waterConsumption;
    }

    // ======== GETTERS ========

    get id () { 
        return this._id; 
    }

    get constructionCost () { 
        return this._constructionCost; 
    }

    get maintenanceCost () { 
        return this._maintenanceCost; 
    }

    get electricityConsumption () { 
        return this._electricityConsumption; 
    }

    get waterConsumption () { 
        return this._waterConsumption; 
    }

    // ======= SETTERS =======

    set id (newId) { 
        this._id = newId; 
    }

    set constructionCost (newConstructionCost) { 
        this._constructionCost = newConstructionCost; 
    }

    set maintenanceCost (newMaintenanceCost) { 
        this._maintenanceCost = newMaintenanceCost; 
    }

    set electricityConsumption (newElectricityConsumption) { 
        this._electricityConsumption = newElectricityConsumption; 
    }

    set waterConsumption (newWaterConsumption) { 
        this._waterConsumption = newWaterConsumption; 
    }

    // ======= METHODS =======

    operate () {

    }

}