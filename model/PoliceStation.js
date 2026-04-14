import ServiceBuilding from "./ServiceBuilding.js";

export default class PoliceStation extends ServiceBuilding {
    // Crea una estacion de policia que mejora la felicidad de la ciudad.
    constructor(id, happinessBonus = 10) {
        super(
            id,
            "Police Station",
            "police-station",
            4000,
            0,
            15,
            0,
            5,
            happinessBonus
        );
    }
}
