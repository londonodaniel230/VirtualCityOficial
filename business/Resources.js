export default class Resources {
    // Guarda los recursos actuales y sus balances por turno.
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
        this._moneyBalance = 0;
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

    get moneyBalance() {
        return this._moneyBalance;
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

    // Indica si la ciudad tiene dinero suficiente para pagar un costo.
    canAfford(cost) {
        return this._money >= cost;
    }

    // Resta dinero si alcanza y devuelve si el pago fue exitoso.
    spendMoney(cost) {
        if (!this.canAfford(cost)) {
            return false;
        }

        this._money -= cost;
        return true;
    }

    // Suma dinero al total disponible.
    addMoney(amount) {
        this._money += amount;
    }

    // Suma energia al total disponible.
    addElectricity(amount) {
        this._electricity += amount;
    }

    // Suma agua al total disponible.
    addWater(amount) {
        this._water += amount;
    }

    // Suma comida al total disponible.
    addFood(amount) {
        this._food += amount;
    }

    // Calcula el balance neto de produccion y consumo sin avanzar el turno.
    calculateBalances(buildings) {
        let producedMoney = 0;
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

            if (typeof building.getMoneyProduction === "function") {
                producedMoney += building.getMoneyProduction();
            }

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

        this._moneyBalance = producedMoney;
        this._electricityBalance = producedElectricity - consumedElectricity;
        this._waterBalance = producedWater - consumedWater;
        this._foodBalance = producedFood;
    }

    // Aplica la produccion, consumo y mantenimiento de todos los edificios en un turno.
    applyTurn(buildings) {
        let totalMaintenance = 0;

        let producedMoney = 0;
        let producedElectricity = 0;
        let producedWater = 0;
        let producedFood = 0;

        let consumedElectricity = 0;
        let consumedWater = 0;

        for (const building of buildings) {
            if (!building) {
                continue;
            }

            totalMaintenance += building.maintenanceCost || 0;
            consumedElectricity += building.electricityConsumption || 0;
            consumedWater += building.waterConsumption || 0;

            if (typeof building.getElectricityProduction === "function") {
                producedElectricity += building.getElectricityProduction();
            }

            if (typeof building.getFoodProduction === "function") {
                producedFood += building.getFoodProduction();
            }
        }

        const projectedElectricity =
            this._electricity + producedElectricity - consumedElectricity;

        const hasElectricity = projectedElectricity >= 0;

        for (const building of buildings) {
            if (!building) {
                continue;
            }

            if (
                (building.type === "store" || building.type === "shopping-center") &&
                hasElectricity &&
                typeof building.getMoneyProduction === "function"
            ) {
                producedMoney += building.getMoneyProduction();
            }

            if (
                building.type === "factory" &&
                hasElectricity &&
                typeof building.getMoneyProduction === "function"
            ) {
                producedMoney += building.getMoneyProduction();
            }

            if (
                building.type === "water-plant" &&
                hasElectricity &&
                typeof building.getWaterProduction === "function"
            ) {
                producedWater += building.getWaterProduction();
            }
        }

        this._money += producedMoney;
        this.spendMoney(totalMaintenance);

        this._electricity += producedElectricity - consumedElectricity;
        this._water += producedWater - consumedWater;
        this._food += producedFood;

        if (this._electricity < 0) {
            this._electricity = 0;
        }

        if (this._water < 0) {
            this._water = 0;
        }

        if (this._food < 0) {
            this._food = 0;
        }

        this._moneyBalance = producedMoney - totalMaintenance;
        this._electricityBalance = producedElectricity - consumedElectricity;
        this._waterBalance = producedWater - consumedWater;
        this._foodBalance = producedFood;

        return {
            maintenancePaid: totalMaintenance,
            moneyProduced: producedMoney,
            electricityProduced: producedElectricity,
            electricityConsumed: consumedElectricity,
            waterProduced: producedWater,
            waterConsumed: consumedWater,
            foodProduced: producedFood
        };
    }
    }
