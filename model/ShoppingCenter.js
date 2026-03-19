import CommercialBuilding from "./CommercialBuilding.js";

export default class ShoppingCenter extends CommercialBuilding {
    constructor(id) {
        super(
            id,
            "Shopping Center",
            "shopping-center",
            8000,
            0,
            25,
            0,
            20,
            2000
        );
    }
}