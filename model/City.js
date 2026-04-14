import Grid from "../model/Grid.js";
import Resources from "../business/Resources.js";
import Citizen from "./Citizen.js";
import Road from "./Road.js";
import House from "./House.js";
import Apartment from "./Apartment.js";
import Store from "./Store.js";
import ShoppingCenter from "./ShoppingCenter.js";
import Factory from "./Factory.js";
import Farm from "./Farm.js";
import PoliceStation from "./PoliceStation.js";
import FireStation from "./FireStation.js";
import Hospital from "./Hospital.js";
import PowerPlant from "./PowerPlant.js";
import WaterPlant from "./WaterPlant.js";
import Park from "./Park.js";
import ScoreSystem from "../business/ScoreSystem.js";

export default class City {

    // Crea la ciudad principal y prepara sus recursos, grid y estado inicial.
    constructor (name, mayor, region, latitude, longitude, mapWidth, mapHeight, grid, citizens) {
        this._name = name;
        this._mayor = mayor;
        this._region = region;
        this._latitude = latitude;
        this._longitude = longitude;
        this._mapWidth = mapWidth;
        this._mapHeight = mapHeight;
        this._currentTurn = 0;
        this._score = 0;
        this._grid = grid;
        this._resources = new Resources(100000);
        this._baseHappiness = 50;
        this._averageHappiness = 50;
        this._citizens = [];
    }

    // ======= GETTERS =======

    get name () {
        return this._name;
    }

    get mayor () { 
        return this._mayor; 
    }

    get region () { 
        return this._region; 
    }

    get latitude () { 
        return this._latitude; 
    }

    get longitude () { 
        return this._longitude; 
    }

    get mapWidth () { 
        return this._mapWidth; 
    }

    get mapHeight () { 
        return this._mapHeight; 
    }

    get currentTurn () { 
        return this._currentTurn; 
    }

    get score () { 
        return this._score; 
    }

    get grid() {
        return this._grid;
    }

    get resources() {
        return this._resources;
    }

    get baseHappiness() {
        return this._baseHappiness;
    }

    get averageHappiness() {
        return this._averageHappiness;
    }

    get citizens() {
        return this._citizens;
    }

    // ======= SETTERS =======

    set name (newName) {
        this._name = newName
    }

    set mayor (newMayor) {
        this._mayor = newMayor;
    }

    set region (newRegion) {
        this._region = newRegion;
    }

    set latitude (newLatitude) {
        this._latitude = newLatitude;
    }

    set longitude (newLongitude) {
        this._longitude = newLongitude;
    }

    set mapWidth (newWidth) {
        this._mapWidth = newWidth;
    }

    set mapHeight (newHeight) {
        this._mapHeight = newHeight;
    }

    set currentTurn (newTurn) {
        this._currentTurn = newTurn;
    }

    set score (newScore) {
        this._score = newScore;
    }

    set grid(newGrid) {
        this._grid = newGrid;
    }

    set resources(newResources) {
        this._resources = newResources;
    }

    set baseHappiness(newBaseHappiness) {
        this._baseHappiness = newBaseHappiness;
    }

    set averageHappiness(newAverageHappiness) {
        this._averageHappiness = newAverageHappiness;
    }

    set citizens(newCitizens) {
        this._citizens = newCitizens;
    }

    // ======= METHODS =======

    // Avanza un turno completo aplicando recursos, felicidad y puntaje.
    advanceTurn() {
        this._currentTurn += 1;

        const buildings = this.getAllBuildings();

        const turnSummary = this._resources.applyTurn(buildings);
        
        this.calculateBaseHappiness();
        this.updateAverageHappiness();
        this.calculateScore();

        return {
            currentTurn: this._currentTurn,
            maintenancePaid: turnSummary.maintenancePaid,
            moneyProduced: turnSummary.moneyProduced,
            electricityProduced: turnSummary.electricityProduced,
            electricityConsumed: turnSummary.electricityConsumed,
            waterProduced: turnSummary.waterProduced,
            waterConsumed: turnSummary.waterConsumed,
            foodProduced: turnSummary.foodProduced,
            baseHappines: this._baseHappiness,
            averageHappiness: this._averageHappiness
        };
    }

    // Recalcula y guarda el puntaje actual de la ciudad.
    calculateScore() {
        this._score = ScoreSystem.calculate(this);
        return this._score;
    }

    // Reune todos los edificios del mapa, excluyendo las vias.
    getAllBuildings() {
        const buildings = [];

        for (let row = 0; row < this._grid.cells.length; row++) {
            for (let col = 0; col < this._grid.cells[row].length; col++) {
                const cell = this._grid.cells[row][col];

                if (!cell.isEmpty() && cell.content.type !== "road") {
                    buildings.push(cell.content);
                }
            }
        }

        return buildings;
    }

    // Actualiza los balances de produccion y consumo segun los edificios actuales.
    updateResourceBalances() {
        const buildings = this.getAllBuildings();
        this._resources.calculateBalances(buildings);
    }

    // Calcula la felicidad base de la ciudad segun servicios y recursos disponibles.
    calculateBaseHappiness() {
        let totalHappiness = 50;

        const buildings = this.getAllBuildings();

        for (const building of buildings) {
            if (!building) {
                continue;
            }

            if (typeof building.happinessBonus !== "undefined") {
                totalHappiness += building.happinessBonus;
            }
        }

        if (this._resources.electricity <= 0) {
            totalHappiness -= 15;
        }

        if (this._resources.water <= 0) {
            totalHappiness -= 15;
        }

        if (this._resources.food <= 0) {
            totalHappiness -= 10;
        }

        if (totalHappiness < 0) {
            totalHappiness = 0;
        }

        this._baseHappiness = totalHappiness;

        return this._baseHappiness;
    }
    
    // Calcula la felicidad promedio general o usa la base si no hay sistema de ciudadanos.
    updateAverageHappiness(citizenSystem = null) {
        if (!citizenSystem) {
            this._averageHappiness = this._baseHappiness;
            return this._averageHappiness;
        }

        this._averageHappiness = citizenSystem.calculateAverageHappiness(this);
        return this._averageHappiness;
    }

    // Devuelve la cantidad total de ciudadanos de la ciudad.
    getPopulation() {
        return this._citizens.length;
    }

    // Filtra los edificios residenciales que pueden alojar ciudadanos.
    getResidentialBuildings() {
        return this.getAllBuildings().filter((building) => 
            building.type === "house" || 
            building.type === "apartment"
        );
    }

    // Filtra los edificios que pueden ofrecer empleos.
    getJobBuildings() {
        return this.getAllBuildings().filter((building) => 
            building.type === "store" || 
            building.type === "shopping-center" ||
            building.type === "factory" ||
            building.type === "farm" 
        );
    }

    // Convierte el contenido de una celda al formato serializable del guardado.
    serializeContent(content) {
        const base = {
            type: content.type
        };

        if (content.type === "road") {
            return {
                ...base,
                cost: content.cost
            };
        }

        return {
            ...base,
            id: content.id,
            name: content.name,
            constructionCost: content.constructionCost,
            maintenanceCost: content.maintenanceCost,
            electricityConsumption: content.electricityConsumption,
            waterConsumption: content.waterConsumption,
            happinessBonus: content.happinessBonus ?? null,
            capacity: content.capacity ?? null,
            jobs: content.jobs ?? null,
            production: content.production ?? null,
            productionAmount: content.productionAmount ?? null,
            residentsCount: content.residents ? content.residents.length : 0,
            workersCount: content.workers ? content.workers.length : 0
        };
    }

    // Reconstruye un ciudadano a partir de datos guardados.
    static createCitizenFromData(data) {
        const citizen = new Citizen(data.id);
        citizen.happiness = data.happiness;
        citizen.hasHouse = data.hasHouse;
        citizen.hasEmployment = data.hasEmployment;
        return citizen;
    }

    // Reconstruye el grid completo usando la informacion guardada.
    static createGridFromData(gridData, width, height) {
        const grid = new Grid(width, height);
        grid.initializeGrid();

        for (let row = 0; row < gridData.length; row++) {
            for (let col = 0; col < gridData[row].length; col++) {
                const cellData = gridData[row][col];

                if (cellData.content) {
                    const content = City.createContentFromData(cellData.content);
                    grid.getCell(cellData.x, cellData.y).setContent(content);
                }
            }
        }

        return grid;
    }

    // Crea el objeto correcto segun el tipo guardado en el JSON.
    static createContentFromData(data) {
        switch (data.type) {
            case "road":
                return new Road();

            case "house":
                return new House(data.id);

            case "apartment":
                return new Apartment(data.id);

            case "store":
                return new Store(data.id);

            case "shopping-center":
                return new ShoppingCenter(data.id);

            case "factory":
                return new Factory(data.id);

            case "farm":
                return new Farm(data.id);

            case "police-station":
                return new PoliceStation(data.id);

            case "fire-station":
                return new FireStation(data.id);

            case "hospital":
                return new Hospital(data.id);

            case "power-plant":
                return new PowerPlant(data.id);

            case "water-plant":
                return new WaterPlant(data.id);

            case "park":
                return new Park(data.id);

            default:
                return null;
        }
    }
    
    // Convierte la ciudad completa a un objeto listo para guardarse como JSON.
    toJSON() {
        return {
            name: this._name,
            mayor: this._mayor,
            region: this._region,
            latitude: this._latitude,
            longitude: this._longitude,
            mapWidth: this._mapWidth,
            mapHeight: this._mapHeight,
            currentTurn: this._currentTurn,
            score: this._score,
            baseHappiness: this._baseHappiness,
            averageHappiness: this._averageHappiness,
            resources: {
                money: this._resources.money,
                electricity: this._resources.electricity,
                water: this._resources.water,
                food: this._resources.food,
                moneyBalance: this._resources.moneyBalance,
                electricityBalance: this._resources.electricityBalance,
                waterBalance: this._resources.waterBalance,
                foodBalance: this._resources.foodBalance
            },
            citizens: this._citizens.map((citizen) => ({
                id: citizen.id,
                happiness: citizen.happiness,
                hasHouse: citizen.hasHouse,
                hasEmployment: citizen.hasEmployment
            })),
            grid: this._grid.cells.map((row) =>
                row.map((cell) => {
                    if (cell.isEmpty()) {
                        return {
                            x: cell.x,
                            y: cell.y,
                            content: null
                        };
                    }

                    const content = cell.content;

                    return {
                        x: cell.x,
                        y: cell.y,
                        content: this.serializeContent(content)
                    };
                })
            )
        };
    }

    // Reconstruye una ciudad completa desde un objeto cargado del guardado.
    static fromJSON(data) {
        const city = new City(
            data.name,
            data.mayor,
            data.region,
            data.latitude,
            data.longitude,
            data.mapWidth,
            data.mapHeight,
            null
        );

        city._currentTurn = data.currentTurn;
        city._score = data.score;
        city._baseHappiness = data.baseHappiness;
        city._averageHappiness = data.averageHappiness;

        city._resources.money = data.resources.money;
        city._resources.electricity = data.resources.electricity;
        city._resources.water = data.resources.water;
        city._resources.food = data.resources.food;

        city._resources._moneyBalance = data.resources.moneyBalance ?? 0;
        city._resources._electricityBalance = data.resources.electricityBalance ?? 0;
        city._resources._waterBalance = data.resources.waterBalance ?? 0;
        city._resources._foodBalance = data.resources.foodBalance ?? 0;

        city._citizens = data.citizens.map((citizenData) => {
            const citizen = City.createCitizenFromData(citizenData);
            return citizen;
        });

        city._grid = City.createGridFromData(data.grid, data.mapWidth, data.mapHeight);

        return city;
    }
}
