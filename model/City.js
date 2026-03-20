import Grid from "../model/Grid.js";
import Resources from "../business/Resources.js";

export default class City {

    constructor (name, mayor, region, latitude, longitude, mapWidth, mapHeight, grid) {
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

    // ======= METHODS =======

    startGame () {

    }

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

    calculateScore() {
        const buildings = this.getAllBuildings();
        const population = 0; // temporal, hasta implementar citizens
        const unemployedCitizens = 0; // temporal
        const allCitizensEmployed = false; // temporal

        let score =
            (population * 10) +
            (this._averageHappiness * 5) +
            (this._resources.money / 100) +
            (buildings.length * 50) +
            (this._resources.electricityBalance * 2) +
            (this._resources.waterBalance * 2);

        // Bonificaciones
        if (allCitizensEmployed && population > 0) {
            score += 500;
        }

        if (this._averageHappiness > 80) {
            score += 300;
        }

        if (
            this._resources.electricity > 0 &&
            this._resources.water > 0 &&
            this._resources.food > 0
        ) {
            score += 200;
        }

        if (population > 1000) {
            score += 1000;
        }

        // Penalizaciones
        if (this._resources.money < 0) {
            score -= 500;
        }

        if (this._resources.electricity < 0) {
            score -= 300;
        }

        if (this._resources.water < 0) {
            score -= 300;
        }

        if (this._averageHappiness < 40) {
            score -= 400;
        }

        score -= unemployedCitizens * 10;

        this._score = Math.floor(score);
        return this._score;
    }

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

    updateResourceBalances() {
        const buildings = this.getAllBuildings();
        this._resources.calculateBalances(buildings);
    }

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
    
    updateAverageHappiness() {
        this._averageHappiness = this._baseHappiness;
        return this._averageHappiness;
    }
}