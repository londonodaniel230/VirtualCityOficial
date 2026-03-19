import Building from "./Building.js";

export default class IndustrialBuilding extends Building {
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

    addWorker(citizen) {

    }

    removeWorker(citizenId) {

    }

    hasJobVacancy() {
        return this._workers.length < this._jobs;
    }

    produceResources() {

    }
}