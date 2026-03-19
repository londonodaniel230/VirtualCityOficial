import Building from "./Building.js";

export default class Park extends Building {
    constructor(id) {
        super(
            id,
            "Park",
            "park",
            "recreational",
            1500,
            0,
            0,
            0
        );

        this._happinessBonus = 5;
    }

    get happinessBonus() {
        return this._happinessBonus;
    }

    set happinessBonus(newHappinessBonus) {
        this._happinessBonus = newHappinessBonus;
    }

    applyHappinessEffect() {

    }
}