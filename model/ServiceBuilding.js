import Building from "./Building.js";

export default class ServiceBuilding extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, radius, happinessBonus) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._radius = radius;
        this._happinessBonus = happinessBonus;
    }

    // ======= GETTERS =======

    get radius () { 
        return this._radius; 
    }

    get happinessBonus () { 
        return this._happinessBonus; 
    }

    // ======= SETTERS =======

    set radius (newRadius) { 
        this._radius = newRadius; 
    }

    set happinessBonus (newHappinessBonus) { 
        this._happinessBonus = newHappinessBonus; 
    }

    // ======= METHODS =======

    applyServiceEffect () {

    }

}