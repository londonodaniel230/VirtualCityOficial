import ResidentialBuilding from "./ResindentialBuilding.js";

export default class House extends ResidentialBuilding {
    constructor(id) {
        super(
            id,
            "House",
            "house",
            1000,
            0,
            5,
            3,
            4
        );
    }
}