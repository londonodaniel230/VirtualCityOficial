import Building from "./Building.js";

export default class ServiceBuilding extends Building {
    // Crea un edificio de servicio con radio de efecto y bono de felicidad.
    constructor(
        id,
        name,
        type,
        constructionCost,
        maintenanceCost,
        electricityConsumption,
        waterConsumption,
        radius,
        happinessBonus
    ) {
        super(
            id,
            name,
            type,
            "service",
            constructionCost,
            maintenanceCost,
            electricityConsumption,
            waterConsumption
        );

        this._radius = radius;
        this._happinessBonus = happinessBonus;
    }

    get radius() {
        return this._radius;
    }

    get happinessBonus() {
        return this._happinessBonus;
    }

    set radius(newRadius) {
        this._radius = newRadius;
    }

    set happinessBonus(newHappinessBonus) {
        this._happinessBonus = newHappinessBonus;
    }

}
