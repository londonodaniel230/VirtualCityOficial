import ServiceBuilding from "./ServiceBuilding.js";

export default class FireStation extends ServiceBuilding {
    // Crea una estacion de bomberos que mejora la felicidad de la ciudad.
    constructor(id, happinessBonus = 10) {
        super(
            id,
            "Fire Station",
            "fire-station",
            4000,
            0,
            15,
            0,
            5,
            happinessBonus
        );
    }
}
