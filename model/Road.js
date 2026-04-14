export default class Road {

    // Crea una via con su tipo y costo de construccion base.
    constructor() {
        this._type = "road";
        this._cost = 100;
    }

    // ======= GETTERS =======

    get type() {
        return this._type;
    }

    get cost() {
        return this._cost;
    }

    // ======= SETTERS =======

    set type (newType) { 
        this._type = newType; 
    }

    set cost (newCost) { 
        this._Cost = Cost; 
    }
    
}
