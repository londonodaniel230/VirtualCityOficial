import UtilityPlant from "./UtilityPlant.js";

export default class PowerPlant extends UtilityPlant {
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

    getElectricityProduction() {
        return this.productionAmount;
    }

    getElectricityProduction() {
        return 200;
    }
}