import ResidentialBuilding from "./ResindentialBuilding.js";

export default class House extends ResidentialBuilding {
    // Crea una casa con sus costos, consumo y capacidad predefinidos.
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
