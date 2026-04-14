import Building from "./Building.js";

export default class IndustrialBuilding extends Building {
    // Crea un edificio industrial con vacantes y tipo de produccion.
    constructor(
        id,
        name,
        type,
        constructionCost,
        maintenanceCost,
        electricityConsumption,
        waterConsumption,
        jobs,
        production
    ) {
        super(
            id,
            name,
            type,
            "industrial",
            constructionCost,
            maintenanceCost,
            electricityConsumption,
            waterConsumption
        );

        this._jobs = jobs;
        this._workers = [];
        this._production = production;
    }

    get jobs() {
        return this._jobs;
    }

    get workers() {
        return this._workers;
    }

    get production() {
        return this._production;
    }

    set jobs(newJobs) {
        this._jobs = newJobs;
    }

    set workers(newWorkers) {
        this._workers = newWorkers;
    }

    set production(newProduction) {
        this._production = newProduction;
    }

    // Agrega un trabajador si el edificio aun tiene vacantes.
    addWorker(citizen) {
        if (!this.hasJobVacancy()) {
            return false;
        }

        this._workers.push(citizen);
        return true;
    }

    // Elimina un trabajador segun su identificador.
    removeWorker(citizenId) {
        this._workers = this._workers.filter((worker) => worker.id !== citizenId);
    }

    // Indica si el edificio todavia tiene empleos disponibles.
    hasJobVacancy() {
        return this._workers.length < this._jobs;
    }
}
