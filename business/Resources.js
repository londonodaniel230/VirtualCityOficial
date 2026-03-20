export default class Resources {
    constructor(
        initialMoney = 100000,
        initialElectricity = 0,
        initialWater = 0,
        initialFood = 0
    ) {
        this._money = initialMoney;
        this._electricity = initialElectricity;
        this._water = initialWater;
        this._food = initialFood;

        this._electricityBalance = 0;
        this._waterBalance = 0;
        this._foodBalance = 0;
    }

    get money() {
        return this._money;
    }

    get electricity() {
        return this._electricity;
    }

    get water() {
        return this._water;
    }

    get food() {
        return this._food;
    }

    get electricityBalance() {
        return this._electricityBalance;
    }

    get waterBalance() {
        return this._waterBalance;
    }

    get foodBalance() {
        return this._foodBalance;
    }

    set money(newMoney) {
        this._money = newMoney;
    }

    set electricity(newElectricity) {
        this._electricity = newElectricity;
    }

    set water(newWater) {
        this._water = newWater;
    }

    set food(newFood) {
        this._food = newFood;
    }

    canAfford(cost) {
        return this._money >= cost;
    }

    spendMoney(cost) {
        if (!this.canAfford(cost)) {
            return false;
        }

        this._money -= cost;
        return true;
    }

    addMoney(amount) {
        this._money += amount;
    }

    addElectricity(amount) {
        this._electricity += amount;
    }

    addWater(amount) {
        this._water += amount;
    }

    addFood(amount) {
        this._food += amount;
    }

    calculateBalances(buildings) {
        let producedElectricity = 0;
        let producedWater = 0;
        let producedFood = 0;

        let consumedElectricity = 0;
        let consumedWater = 0;

        for (const building of buildings) {
            if (!building) {
                continue;
            }

            consumedElectricity += building.electricityConsumption || 0;
            consumedWater += building.waterConsumption || 0;

            if (typeof building.getElectricityProduction === "function") {
                producedElectricity += building.getElectricityProduction();
            }

            if (typeof building.getWaterProduction === "function") {
                producedWater += building.getWaterProduction();
            }

            if (typeof building.getFoodProduction === "function") {
                producedFood += building.getFoodProduction();
            }
        }

        this._electricityBalance = producedElectricity - consumedElectricity;
        this._waterBalance = producedWater - consumedWater;
        this._foodBalance = producedFood;

        this._electricity = this._electricityBalance;
        this._water = this._waterBalance;
        this._food = this._foodBalance;
    }
}