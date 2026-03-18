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
        this._resources = new Resources(1000);
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

    // ======= METHODS =======

    startGame () {

    }

    advanceTurn () {

    }

    calculateScore () {

    }
    
}