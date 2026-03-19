import UtilityPlant from "./UtilityPlant.js";

export default class WaterPlant extends UtilityPlant {
    constructor(id) {
        super(
            id,
            "Water Plant",
            "water-plant",
            8000,
            0,
            20,
            0,
            150
        );
    }
}