import Building from "./Building.js";

export default class UtilityPlant extends Building {
    // Crea una planta de servicio publico con una cantidad fija de produccion.
    constructor(
        id,
        name,
        type,
        constructionCost,
        maintenanceCost,
        electricityConsumption,
        waterConsumption,
        productionAmount
    ) {
        super(
            id,
            name,
            type,
            "utility",
            constructionCost,
            maintenanceCost,
            electricityConsumption,
            waterConsumption
        );

        this._productionAmount = productionAmount;
    }

    get productionAmount() {
        return this._productionAmount;
    }

    set productionAmount(newProductionAmount) {
        this._productionAmount = newProductionAmount;
    }

}
