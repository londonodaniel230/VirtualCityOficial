import CommercialBuilding from "./CommercialBuilding.js";

export default class Store extends CommercialBuilding {
    constructor(id) {
        super(
            id,
            "Store",
            "store",
            2000,
            0,
            8,
            0,
            6,
            500
        );
    }

    getMoneyProduction() {
        return 500;
    }
}