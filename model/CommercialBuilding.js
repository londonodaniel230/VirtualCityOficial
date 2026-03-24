import Building from "./Building.js";

export default class CommercialBuilding extends Building {
    constructor(
        id,
        name,
        type,
        constructionCost,
        maintenanceCost,
        electricityConsumption,
        waterConsumption,
        jobs,
        incomePerTurn
    ) {
        super(
            id,
            name,
            type,
            "commercial",
            constructionCost,
            maintenanceCost,
            electricityConsumption,
            waterConsumption
        );

        this._jobs = jobs;
        this._workers = [];
        this._incomePerTurn = incomePerTurn;
    }

    get jobs() {
        return this._jobs;
    }

    get workers() {
        return this._workers;
    }

    get incomePerTurn() {
        return this._incomePerTurn;
    }

    set jobs(newJobs) {
        this._jobs = newJobs;
    }

    set workers(newWorkers) {
        this._workers = newWorkers;
    }

    set incomePerTurn(newIncomePerTurn) {
        this._incomePerTurn = newIncomePerTurn;
    }

    addWorker(citizen) {
        if (!this.hasJobVacancy()) {
            return false;
        }

        this._workers.push(citizen);
        return true;
    }   

    removeWorker(citizenId) {
        this._workers = this._workers.filter((worker) => worker.id !== citizenId);
    }

    hasJobVacancy() {
        return this._workers.length < this._jobs;
    }
}