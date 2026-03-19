export default class Building {

    constructor (id, name, type, category, constructionCost, maintenanceCost, electricityConsumption, waterConsumption) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._category = category;
        this._constructionCost = constructionCost;
        this._maintenanceCost = maintenanceCost;
        this._electricityConsumption = electricityConsumption;
        this._waterConsumption = waterConsumption;
    }

    // ======== GETTERS ========

    get id () { 
        return this._id; 
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get category() {
        return this._category;
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

    set name(newName) {
        this._name = newName;
    }

    set type(newType) {
        this._type = newType;
    }

    set category(newCategory) {
        this._category = newCategory;
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