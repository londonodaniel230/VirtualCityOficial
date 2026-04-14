import UtilityPlant from "./UtilityPlant.js";

export default class WaterPlant extends UtilityPlant {
    // Crea una planta de agua con produccion fija por turno.
    constructor(id) {
        super(
            id,
            "Water Plant",
            "water-plant",
            8000,
            0,
            20,
            0,
            150
        );
    }

    // Devuelve el agua producida por la planta.
    getWaterProduction() {
        return this.productionAmount;
    }
}
