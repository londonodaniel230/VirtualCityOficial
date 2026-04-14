import ResidentialBuilding from "./ResindentialBuilding.js";

export default class Apartment extends ResidentialBuilding {
    // Crea un apartamento con mayor capacidad y consumo que una casa.
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
