import ServiceBuilding from "./ServiceBuilding.js";

export default class Hospital extends ServiceBuilding {
    // Crea un hospital que mejora la felicidad y consume mas recursos.
    constructor(id, happinessBonus = 10) {
        super(
            id,
            "Hospital",
            "hospital",
            6000,
            0,
            20,
            10,
            7,
            happinessBonus
        );
    }
}
