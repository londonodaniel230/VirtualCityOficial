import City from "../../model/City.js";
import Grid from "../../model/Grid.js";
import Road from "../../model/Road.js";
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
        
        this._city = null;
        this._selectedCell = null;
        this._currentMode = "select";
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
                this.setBuildRoadMode();
            });
        }
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

        this.selectCell(x, y);
    }

    /*
     * Activa el modo de construcción de vías.
     */
    setBuildRoadMode() {
        if (this._currentMode === "buildRoad") {
        this._currentMode = "select";
        this._buildRoadButton.textContent = "Build Road";
        this._buildRoadButton.classList.remove("btn-danger");
        this._buildRoadButton.classList.add("btn-warning");
        console.log("Select mode activated");
        return;
    }

        this._currentMode = "buildRoad";
        this._buildRoadButton.textContent = "Cancel Road";
        this._buildRoadButton.classList.remove("btn-warning");
        this._buildRoadButton.classList.add("btn-danger");
        console.log("Build Road mode activated");
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
}