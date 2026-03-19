import City from "../../model/City.js";
import Grid from "../../model/Grid.js";
import Road from "../../model/Road.js";
import House from "../../model/House.js";
import Apartment from "../../model/Apartment.js";
import Store from "../../model/Store.js";
import ShoppingCenter from "../../model/ShoppingCenter.js";
import Factory from "../../model/Factory.js";
import Farm from "../../model/Farm.js";
import PoliceStation from "../../model/PoliceStation.js";
import FireStation from "../../model/FireStation.js";
import Hospital from "../../model/Hospital.js";
import PowerPlant from "../../model/PowerPlant.js";
import WaterPlant from "../../model/WaterPlant.js";
import Park from "../../model/Park.js";
import BuildValidator from "../../business/BuildValidator.js";
import BuildMenuView from "../views/BuildMenuView.js";
import GridView from "../views/GridView.js";

export default class GameController {

    /*
     * Constructor del controlador principal del juego.
     * Aquí se guardan las referencias a los elementos del HTML que se van a usar
     * (formulario, secciones, barra de información) y se crea la vista del mapa.
     * También se inicializan variables para guardar la ciudad creada y la celda seleccionada.
     */
    constructor() {
        this._form = document.getElementById("city-form");
        this._setupSection = document.getElementById("setup-section");
        this._mapSection = document.getElementById("map-section");
        this._infoBar = document.getElementById("info-bar");
        this._infoText = document.getElementById("info-text");
        this._buildRoadButton = document.getElementById("build-road-btn");
       
        this._gridView = new GridView("map-grid");
        this._buildMenuView = new BuildMenuView("build-menu");

        this._city = null;
        this._selectedCell = null;
        this._currentMode = "select";
        this._selectedBuildingType = null;
    }

    /*
     * Inicializa el controlador.
     * Se encarga de escuchar cuando el usuario envía el formulario para
     * crear la ciudad y llama al método que la genera.
     */

    init() {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createCity();
        });

        if (this._buildRoadButton) {
            this._buildRoadButton.addEventListener("click", () => {
                this.setMode("buildRoad", this._buildRoadButton);
            });
        }

        this._buildMenuView.bindBuildingSelection((buildingType, button) => {
            this.setMode("buildBuilding", button, buildingType);
        });
    }

     /*
     * Crea la ciudad con los datos ingresados en el formulario.
     * También genera el grid del mapa, oculta el formulario inicial,
     * muestra la información de la ciudad y renderiza el mapa en pantalla.
     */
    createCity() {
        const cityName = document.getElementById("cityName").value.trim();
        const mayorName = document.getElementById("mayorName").value.trim();
        const region = document.getElementById("region").value.trim();
        const size = parseInt(document.getElementById("mapSize").value);

        const grid = new Grid(size, size);
        grid.initializeGrid();

        this._city = new City(
            cityName,
            mayorName,
            region,
            0,
            0,
            size,
            size,
            grid
        );

        this._setupSection.classList.add("d-none");

        this.showCityInfo();

        this.renderGrid();

        this._mapSection.classList.remove("d-none");
        this._infoBar.classList.remove("d-none");
    }

    /*
     * Renderiza el grid de la ciudad.
     */
    renderGrid() {
        this._gridView.render(this._city.grid, (x, y) => {
            this.handleCellClick(x, y);
        });
    }

    /*
     * Decide qué hacer cuando el usuario hace clic en una celda
     * dependiendo del modo actual del juego.
     */
    handleCellClick(x, y) {

        if (this._currentMode === "buildRoad") {
            this.buildRoad(x, y);
            return;
        }

        if (this._currentMode === "buildBuilding") {
            this.buildBuilding(x, y);
            return;
        }

        this.selectCell(x, y);
    }

    /*
     * Construye una vía si la celda está vacía
     * y si hay dinero suficiente.
     */
    buildRoad(x, y) {

        const grid = this._city.grid;
        const resources = this._city.resources;

        const road = new Road();

        const cell = grid.getCell(x, y);

        if (!cell) {
            return;
        }

        if (!cell.isEmpty()) {
            alert("This cell is already occupied.");
            return;
        }

        if (!resources.canAfford(road.cost)) {
            alert("Not enough money.");
            return;
        }

        const success = grid.placeRoad(road, x, y);

        if (!success) {
            return;
        }

        resources.spendMoney(road.cost);

        this._selectedCell = { x, y };

        this.renderGrid();

        this._gridView.highlightSelectedCell(x, y);

        this.showCityInfo();

        console.log(`Road built at (${x}, ${y})`);
    }

    createBuildingByType(buildingType) {
        switch (buildingType) {
            case "house":
                return new House(1);

            case "apartment":
                return new Apartment(2);

            case "store":
                return new Store(3);

            case "shopping-center":
                return new ShoppingCenter(4);

            case "factory":
                return new Factory(5);

            case "farm":
                return new Farm(6);

            case "police-station":
                return new PoliceStation(7);

            case "fire-station":
                return new FireStation(8);

            case "hospital":
                return new Hospital(9);

            case "power-plant":
                return new PowerPlant(10);

            case "water-plant":
                return new WaterPlant(11);

            case "park":
                return new Park(12);

            default:
                return null;
        }
    }

    buildBuilding(x, y) {
        const grid = this._city.grid;
        const resources = this._city.resources;

        const building = this.createBuildingByType(this._selectedBuildingType);

        if (!building) {
            return;
        }

        const validation = BuildValidator.canBuildBuilding(
            grid,
            resources,
            building,
            x,
            y
        );

        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        const success = grid.placeBuilding(building, x, y);

        if (!success) {
            return;
        }

        resources.spendMoney(building.constructionCost);

        this._selectedCell = { x, y };

        this.renderGrid();
        this._gridView.highlightSelectedCell(x, y);
        this.showCityInfo();

        console.log(`${building.name} built at (${x}, ${y})`);
    }

    /*
     * Muestra en la barra superior la información básica de la ciudad
     * como nombre, alcalde, región, tamaño del mapa y dinero.
     */
    showCityInfo() {
        this._infoText.textContent =
        `City: ${this._city.name} | Mayor: ${this._city.mayor} | Region: ${this._city.region} | Size: ${this._city.mapWidth} x ${this._city.mapHeight} | Money: $${this._city.resources.money}`;
    }

    /*
     * Se ejecuta cuando el usuario hace clic en una celda del mapa.
     * Guarda la posición seleccionada y la resalta visualmente.
     */
    selectCell(x, y) {
        this._selectedCell = { x, y };

        this._gridView.highlightSelectedCell(x, y);

        console.log("Selected cell:", this._selectedCell);
    }

    setMode(mode, button, extraData = null) {

        const isSameRoadMode =
            mode === "buildRoad" && this._currentMode === "buildRoad";

        const isSameBuildingMode =
            mode === "buildBuilding" &&
            this._currentMode === "buildBuilding" &&
            this._selectedBuildingType === extraData;

        // Si se pulsa el mismo botón otra vez, cancelar
        if (isSameRoadMode || isSameBuildingMode) {
            this._currentMode = "select";
            this._selectedBuildingType = null;

            this.resetButtons();

            console.log("Select mode activated");
            return;
        }

        // Activar nuevo modo
        this._currentMode = mode;

        if (mode === "buildBuilding") {
            this._selectedBuildingType = extraData;
        } else {
            this._selectedBuildingType = null;
        }

        this.resetButtons();

        button.textContent = "Cancel";
        button.classList.remove("btn-warning", "btn-light");
        button.classList.add("btn-danger");

        console.log(`Mode activated: ${mode}`, extraData);
    }

    resetButtons() {
        const allButtons = document.querySelectorAll("#build-road-btn, #build-menu button");

        allButtons.forEach((btn) => {
            btn.classList.remove("btn-danger", "btn-warning");
            btn.classList.add("btn-light");

            if (btn.dataset.building) {
                if (btn.dataset.label) {
                    btn.textContent = btn.dataset.label;
                } else {
                    btn.textContent = btn.dataset.building;
                }
            } else if (btn.id === "build-road-btn") {
                btn.textContent = "Build Road";
                btn.classList.remove("btn-light");
                btn.classList.add("btn-warning");
            }
        });
    }
}