import IndustrialBuilding from "./IndustrialBuilding.js";

export default class Factory extends IndustrialBuilding {
    // Crea una fabrica que genera dinero y empleos industriales.
    constructor(id) {
        super(
            id,
            "Factory",
            "factory",
            5000,
            0,
            20,
            15,
            15,
            800
        );
    }

    // Devuelve el dinero que produce la fabrica en cada turno.
    getMoneyProduction() {
        return 800;
    }
}
