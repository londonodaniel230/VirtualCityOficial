import IndustrialBuilding from "./IndustrialBuilding.js";

export default class Farm extends IndustrialBuilding {
    // Crea una granja que produce alimento y ofrece empleos.
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

    // Devuelve la cantidad de alimento producida por turno.
    getFoodProduction() {
        return 50;
    }
}
