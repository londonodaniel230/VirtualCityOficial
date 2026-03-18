import Building from "./Building.js";

export default class UtilityPlant extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, productionAmount) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._productionAmount = productionAmount;
    }

    // ======= GETTERS =======

    get productionAmount () { 
        return this._productionAmount; 
    }

    // ======= SETTERS =======

    set productionAmount (newProductionAmount) { 
        this._productionAmount = newProductionAmount; 
    }

    // ======= METHODS =======

    produceUtility () {

    }

}