import IndustrialBuilding from "./IndustrialBuilding.js";

export default class Factory extends IndustrialBuilding {
    constructor(id) {
        super(
            id,
            "Factory",
            "factory",
            5000,
            0,
            20,
            15,
            15,
            800
        );
    }

    getMoneyProduction() {
        return 800;
    }
}