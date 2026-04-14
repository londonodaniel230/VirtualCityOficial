import CommercialBuilding from "./CommercialBuilding.js";

export default class ShoppingCenter extends CommercialBuilding {
    // Crea un centro comercial con mas empleos e ingresos por turno.
    constructor(id) {
        super(
            id,
            "Shopping Center",
            "shopping-center",
            8000,
            0,
            25,
            0,
            20,
            2000
        );
    }

    // Devuelve el dinero que produce el centro comercial en cada turno.
    getMoneyProduction() {
        return 2000;
    }
}
