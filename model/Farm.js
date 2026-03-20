import IndustrialBuilding from "./IndustrialBuilding.js";

export default class Farm extends IndustrialBuilding {
    constructor(id) {
        super(
            id,
            "Farm",
            "farm",
            3000,
            0,
            0,
            10,
            8,
            50
        );
    }

    getFoodProduction() {
        return 50;
    }
}