import CommercialBuilding from "./CommercialBuilding.js";

export default class Store extends CommercialBuilding {
    // Crea una tienda con empleos e ingresos basicos por turno.
    constructor(id) {
        super(
            id,
            "Store",
            "store",
            2000,
            0,
            8,
            0,
            6,
            500
        );
    }

    // Devuelve el dinero que produce la tienda en cada turno.
    getMoneyProduction() {
        return 500;
    }
}
