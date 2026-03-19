import ServiceBuilding from "./ServiceBuilding.js";

export default class FireStation extends ServiceBuilding {
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