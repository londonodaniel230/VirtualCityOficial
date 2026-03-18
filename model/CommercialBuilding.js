import Building from "./Building.js";

export default class CommercialBuilding extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, jobs) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._jobs = jobs;
        this._workers = [];
    }
    // ======= GETTERS =======

    get jobs () { 
        return this._jobs; 
    }

    get workers () { 
        return this._workers; 
    }

    // ======= SETTERS =======

    set jobs (newJobs) { 
        this._jobs = newJobs; 
    }

    set workers (newWorkers) { 
        this._workers = newWorkers; 
    }

    // ======= METHODS =======

    addWorker (citizen) {

    }

    removeWorker (citizenId) {

    }

    hasJobVacancy () {

    }

}