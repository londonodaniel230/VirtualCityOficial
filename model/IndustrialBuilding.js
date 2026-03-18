import Building from "./Building.js";

export default class IndustrialBuilding extends Building {

    constructor (id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption, jobs, production) {
        super(id, constructionCost, maintenanceCost, electricityConsumption, waterConsumption);
        this._jobs = jobs;
        this._workers = [];
        this._production = production;
    }

    // ======= GETTERS =======

    get jobs () { 
        return this._jobs; 
    }

    get workers () { 
        return this._workers; 
    }

    get production () { 
        return this._production; 
    }

    // ======= SETTERS =======

    set jobs (newJobs) { 
        this._jobs = newJobs; 
    }

    set workers (newWorkers) { 
        this._workers = newWorkers; 
    }

    set production (newProduction) { 
        this._production = newProduction; 
    }

    // ======= METHODS =======

    addWorker (citizen) {

    }

    removeWorker (citizenId) {

    }

    hasJobVacancy () {

    }

    produceResources () {

    }

}