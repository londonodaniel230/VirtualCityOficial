export default class Resources {
    constructor (initialMoney = 100000) {
        this._money = initialMoney;
    }

    get money () {
        return this._money;
    }

    set money (newMoney) {
        this._money = newMoney;
    }

    canAfford (cost) {
        return this._money >= cost;
    }

    spendMoney (cost) {
        if (!this.canAfford(cost)) {
            return false;
        }

        this._money -= cost;
        return true;
    }

    addMoney (amount) {
        this._money += amount;
    }
}