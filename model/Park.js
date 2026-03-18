import Building from "./Building.js";

export default class Park extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, happinessBonus) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._happinessBonus = happinessBonus;
    }

    // ======= GETTERS =======

    get happinessBonus () { 
        return this._happinessBonus; 
    }

    // ======= SETTERS =======

    set happinessBonus (newHappinessBonus) { 
        this._happinessBonus = newHappinessBonus; 
    }

    // ======= METHODS =======

    applyHappinessEffect () {

    }

}