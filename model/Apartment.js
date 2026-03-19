import ResidentialBuilding from "./ResindentialBuilding.js";

export default class Apartment extends ResidentialBuilding {
    constructor(id) {
        super(
            id,
            "Apartment",
            "apartment",
            3000,
            0,
            15,
            10,
            12
        );
    }
}