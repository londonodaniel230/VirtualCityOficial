import Citizen from "../model/Citizen.js";

export default class CitizenSystem {
    // Inicializa el sistema que controla el crecimiento de ciudadanos por turno.
    constructor(growthPerTurn = 3) {
        this._growthPerTurn = growthPerTurn;
        this._nextCitizenId = 1;
    }

    get growthPerTurn() {
        return this._growthPerTurn;
    }

    set growthPerTurn(newGrowthPerTurn) {
        this._growthPerTurn = newGrowthPerTurn;
    }

    // Crea nuevos ciudadanos solo si hay vivienda, empleo y felicidad suficiente.
    createCitizens(city) {
        const availableHousing = this.countAvailableHousing(city);
        const availableJobs = this.countAvailableJobs(city);

        if (availableHousing <= 0) {
            return [];
        }

        if (availableJobs <= 0) {
            return [];
        }

        if (city.averageHappiness <= 60) {
            return [];
        }

        const amountToCreate = Math.min(
            this._growthPerTurn,
            availableHousing,
            availableJobs
        );

        const newCitizens = [];

        for (let i = 0; i < amountToCreate; i++) {
            const citizen = new Citizen(this._nextCitizenId);
            this._nextCitizenId += 1;
            newCitizens.push(citizen);
        }

        return newCitizens;
    }

    // Asigna cada ciudadano nuevo a la primera vivienda con espacio disponible.
    assignHousing(city, citizens) {
        const residentialBuildings = city.getResidentialBuildings();

        for (const citizen of citizens) {
            for (const building of residentialBuildings) {
                if (building.hasAvailableSpace()) {
                    const assigned = building.addResident(citizen);

                    if (assigned) {
                        citizen.assignHouse(building.id);
                        break;
                    }
                }
            }
        }
    }

    // Asigna cada ciudadano nuevo al primer trabajo con vacantes disponibles.
    assignJobs(city, citizens) {
        const jobBuildings = city.getJobBuildings();

        for (const citizen of citizens) {
            for (const building of jobBuildings) {
                if (building.hasJobVacancy()) {
                    const assigned = building.addWorker(citizen);

                    if (assigned) {
                        citizen.assignJob(building.id);
                        break;
                    }
                }
            }
        }
    }

    // Calcula la felicidad promedio usando la felicidad individual de cada ciudadano.
    calculateAverageHappiness(city) {
        const citizens = city.citizens;

        if (citizens.length === 0) {
            return city.baseHappiness;
        }

        let totalHappiness = 0;

        for (const citizen of citizens) {
            totalHappiness += citizen.calculateHappiness(city.baseHappiness);
        }

        return totalHappiness / citizens.length;
    }

    // Cuenta cuantos espacios de vivienda siguen libres en la ciudad.
    countAvailableHousing(city) {
        let total = 0;

        const residentialBuildings = city.getResidentialBuildings();

        for (const building of residentialBuildings) {
            total += building.capacity - building.residents.length;
        }

        return total;
    }

    // Cuenta cuantas vacantes laborales siguen libres en la ciudad.
    countAvailableJobs(city) {
        let total = 0;

        const jobBuildings = city.getJobBuildings();

        for (const building of jobBuildings) {
            total += building.jobs - building.workers.length;
        }

        return total;
    }
}
