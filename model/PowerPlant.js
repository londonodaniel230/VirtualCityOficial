import UtilityPlant from "./UtilityPlant.js";

export default class PowerPlant extends UtilityPlant {
    // Crea una planta electrica con produccion fija de energia.
    constructor(id) {
        super(
            id,
            "Power Plant",
            "power-plant",
            10000,
            0,
            0,
            0,
            200
        );
    }

    // Devuelve la energia producida por la planta.
    getElectricityProduction() {
        return this.productionAmount;
    }
}
