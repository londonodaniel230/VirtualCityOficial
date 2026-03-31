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
import InfoPanelView from "../views/InfoPanelView.js";
import ResourcePanelView from "../views/ResourcePanelView.js";
import TurnSystem from "../../business/TurnSystem.js";
import CitizenSystem from "../../business/CitizenSystem.js";
import SaveManager from "../../data_access/SaveManager.js";

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
        this._demolishButton = document.getElementById("demolish-btn");
        this._infoPanel = document.getElementById("info-panel");
        this._resourcePanel = document.getElementById("resource-panel");
        this._pauseTurnButton = document.getElementById("pause-turn-btn");
        this._turnTimerText = document.getElementById("turn-timer-text");
        this._citizenSystem = new CitizenSystem(3);

        this._infoPanelView = new InfoPanelView("info-panel");
        this._gridView = new GridView("map-grid");
        this._buildMenuView = new BuildMenuView("build-menu");
        this._resourcePanelView = new ResourcePanelView("resource-panel");

        this._saveManager = new SaveManager();
        this._saveGameButton = document.getElementById("save-game-btn");
        this._exportGameButton = document.getElementById("export-game-btn");
        this._autoSaveIntervalId = null;
        this._loadJsonButton = document.getElementById("load-json-btn");
        this._importJsonFile = document.getElementById("importJsonFile");
        this._continueGameButton = document.getElementById("continue-game-btn");
        this._newGameButton = document.getElementById("new-game-btn");

        this._city = null;
        this._selectedCell = null;
        this._currentMode = "select";
        this._selectedBuildingType = null;

        this._turnSystem = new TurnSystem(
            () => {
                this.executeTurn();
            },
            (remainingSeconds) => {
                this.updateTurnTimer(remainingSeconds);
            },
            5000
        );
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

        if (this._demolishButton) {
            this._demolishButton.addEventListener("click", () => {
                this.setMode("demolish", this._demolishButton);
            });
        }

        if (this._pauseTurnButton) {
            this._pauseTurnButton.addEventListener("click", () => {
                this.toggleTurnSystem();
            });
        }

        this._buildMenuView.bindBuildingSelection((buildingType, button) => {
            this.setMode("buildBuilding", button, buildingType);
        });

        if (this._saveGameButton) {
            this._saveGameButton.addEventListener("click", () => {
                this.saveCurrentGame();
            });
        }

        if (this._exportGameButton) {
            this._exportGameButton.addEventListener("click", () => {
                this.exportCurrentGame();
            });
        }

        if (this._loadJsonButton) {
            this._loadJsonButton.addEventListener("click", () => {
                this.loadGameFromJsonFile();
            });
        }

        if (this._continueGameButton) {
            this._continueGameButton.addEventListener("click", () => {
                this.loadSavedGame();
            });
        }

        if (this._newGameButton) {
            this._newGameButton.addEventListener("click", () => {
                this.startNewGame();
            });
        }

        const savedData = this._saveManager.loadGame();

        if (savedData) {
            if (this._continueGameButton) {
                this._continueGameButton.classList.remove("d-none");
            }

            if (this._newGameButton) {
                this._newGameButton.classList.remove("d-none");
            }
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

        const turnDurationInput = parseInt(document.getElementById("turnDuration").value);
        const turnDuration = isNaN(turnDurationInput) || turnDurationInput < 1 ? 5 : turnDurationInput;

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

        this._city.calculateBaseHappiness();
        this._city.updateAverageHappiness(this._citizenSystem);

        this._turnSystem.stop();
        this._turnSystem.intervalMs = turnDuration * 1000;
        this._turnSystem.reset();

        this._setupSection.classList.add("d-none");

        this.showCityInfo();
        this.renderGrid();

        this._mapSection.classList.remove("d-none");
        this._infoBar.classList.remove("d-none");
        this._infoPanel.classList.remove("d-none");
        this._resourcePanel.classList.remove("d-none");

        this.updateResourcePanel();

        this._turnSystem.start();
        this.updateTurnTimer(Math.ceil(this._turnSystem.intervalMs / 1000));
        this.startAutoSave();
        this._saveManager.saveGame(this._city.toJSON());
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

        if (this._currentMode === "demolish") {
            this.demolishSelectedCell(x, y);
            return;
        }

        this.selectCell(x, y);
        this.showBuildingInfo(x, y);
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

        this._city.updateResourceBalances();
        this.updateResourcePanel();

        this._saveManager.saveGame(this._city.toJSON());

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
        this._city.updateResourceBalances();
        this.updateResourcePanel();

        this._saveManager.saveGame(this._city.toJSON());

        console.log(`${building.name} built at (${x}, ${y})`);
    }

    /*
     * Muestra en la barra superior la información básica de la ciudad
     * como nombre, alcalde, región, tamaño del mapa y dinero.
     */
    showCityInfo() {
        this._infoText.textContent =
        `City: ${this._city.name} | Mayor: ${this._city.mayor} | Region: ${this._city.region} | Size: ${this._city.mapWidth} x ${this._city.mapHeight} | Turn: ${this._city.currentTurn} | Score: ${this._city.score} `;
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

        const isSameDemolishMode = 
            mode === "demolish" && this._currentMode === "demolish";

        // Si se pulsa el mismo botón otra vez, cancelar
        if (isSameRoadMode || isSameBuildingMode || isSameDemolishMode) {
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
        const allButtons = document.querySelectorAll("#build-road-btn, #build-menu button, #demolish-btn");

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
            } else if (btn.id === "demolish-btn"){
                btn.textContent = "Demolish";
            }
        });
    }

    showBuildingInfo(x, y) {
        const grid = this._city.grid;
        const cell = grid.getCell(x, y);

        if (!cell || cell.isEmpty()) {
            this._infoPanelView.showMessage("Empty cell.");
            return;
        }

        const content = cell.content;

        if (content.type === "road") {
            this._infoPanelView.showRoadInfo(content);
            return;
        }

        this._infoPanelView.showBuildingInfo(content);
    }

    demolishSelectedCell(x, y) {
        const grid = this._city.grid;
        const resources = this._city.resources;

        const cell = grid.getCell(x, y);

        if (!cell || cell.isEmpty()) {
            alert("There is nothing to demolish here.");
            return;
        }

        const removedContent = grid.removeContent(x, y);

        if (!removedContent) {
            return;
        }

        let refund = 0;

        if (removedContent.type === "road") {
            refund = Math.floor(removedContent.cost * 0.5);
        } else if (typeof removedContent.getSellValue === "function") {
            refund = removedContent.getSellValue();
        }

        resources.addMoney(refund);

        this._selectedCell = { x, y };

        this.renderGrid();
        this.showCityInfo();
        this._city.updateResourceBalances();
        this.updateResourcePanel();
        this._infoPanelView.showMessage(`Demolished successfully. Refund: $${refund}`);

        this._saveManager.saveGame(this._city.toJSON());

        console.log(`Content demolished at (${x}, ${y}). Refund: $${refund}`);
    }

    updateResourcePanel() {
        this._resourcePanelView.render(this._city.resources, this._city);
    }

    executeTurn() {
        if (!this._city) {
            return;
        }

        const turnResult = this._city.advanceTurn();

        const newCitizens = this._citizenSystem.createCitizens(this._city);

        if (newCitizens.length > 0) {
            this._citizenSystem.assignHousing(this._city, newCitizens);
            this._citizenSystem.assignJobs(this._city, newCitizens);

            this._city.citizens.push(...newCitizens);
        }

        this._city.updateAverageHappiness(this._citizenSystem);
        this._city.calculateScore();

        this.showCityInfo();
        this.updateResourcePanel();

        this._infoPanelView.showMessage(
            `Turn ${turnResult.currentTurn} completed.<br>
            New citizens: ${newCitizens.length}<br>
            Maintenance: $${turnResult.maintenancePaid}<br>
            Money Produced: $${turnResult.moneyProduced}<br>
            Electricity: +${turnResult.electricityProduced} / -${turnResult.electricityConsumed}<br>
            Water: +${turnResult.waterProduced} / -${turnResult.waterConsumed}<br>
            Food Produced: +${turnResult.foodProduced}<br>
            Avg Happiness: ${this._city.averageHappiness.toFixed(2)}`
        );

        this._saveManager.saveGame(this._city.toJSON());

        console.log(`Turn ${turnResult.currentTurn} executed`);
    }

    toggleTurnSystem() {
        if (this._turnSystem.isRunning) {
            this._turnSystem.stop();

            if (this._pauseTurnButton) {
                this._pauseTurnButton.textContent = "Resume Turns";
            }

            return;
        }

        this._turnSystem.start();

        if (this._pauseTurnButton) {
            this._pauseTurnButton.textContent = "Pause Turns";
        }
    }

    updateTurnTimer(remainingSeconds) {
        if (this._turnTimerText) {
            this._turnTimerText.textContent = `Next Turn In: ${remainingSeconds}s`;
        }
    }

    saveCurrentGame() {
        if (!this._city) {
            return;
        }

        this._saveManager.saveGame(this._city.toJSON());
        this._infoPanelView.showMessage("Game saved successfully.");
    }

    loadSavedGame() {
        const savedData = this._saveManager.loadGame();

        if (!savedData) {
            this._infoPanelView.showMessage("No saved game found.");
            return;
        }

        this._city = City.fromJSON(savedData);

        this._setupSection.classList.add("d-none");
        this._mapSection.classList.remove("d-none");
        this._infoBar.classList.remove("d-none");
        this._infoPanel.classList.remove("d-none");
        this._resourcePanel.classList.remove("d-none");

        this.showCityInfo();
        this.renderGrid();
        this.updateResourcePanel();

        this._turnSystem.reset();
        this._turnSystem.start();

        this._infoPanelView.showMessage("Saved game loaded successfully.");
    }

    exportCurrentGame() {
        if (!this._city) {
            return;
        }

        this._saveManager.exportToJson(this._city.toJSON());
        this._infoPanelView.showMessage("Game exported to JSON.");
    }

    startAutoSave() {
        this.stopAutoSave();

        this._autoSaveIntervalId = setInterval(() => {
            if (this._city) {
                this._saveManager.saveGame(this._city.toJSON());
                console.log("Auto-save completed.");
            }
        }, 30000);
    }

    stopAutoSave() {
        if (this._autoSaveIntervalId) {
            clearInterval(this._autoSaveIntervalId);
            this._autoSaveIntervalId = null;
        }
    }

    restoreGame(savedData) {
        if (!savedData) {
            return;
        }

        this._city = City.fromJSON(savedData);

        // Ocultar setup y mostrar juego
        this._setupSection.classList.add("d-none");
        this._mapSection.classList.remove("d-none");
        this._infoBar.classList.remove("d-none");
        this._infoPanel.classList.remove("d-none");
        this._resourcePanel.classList.remove("d-none");

        // Renderizar todo
        this.showCityInfo();
        this.renderGrid();
        this.updateResourcePanel();

        // Reiniciar sistema de turnos
        this._turnSystem.reset();
        this._turnSystem.start();

        this.updateTurnTimer(Math.ceil(this._turnSystem.intervalMs / 1000));

        // Iniciar autoguardado
        this.startAutoSave();
    }

    loadGameFromJsonFile() {
        const file = this._importJsonFile.files[0];

        if (!file) {
            alert("Please select a JSON file first.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const jsonText = event.target.result;
                const savedData = this._saveManager.importGameFromJson(jsonText);

                if (!savedData) {
                    alert("Invalid save file.");
                    return;
                }

                this.restoreGame(savedData);
                this._saveManager.saveGame(this._city.toJSON());
            } catch (error) {
                console.error(error);
                alert("Could not load the JSON file.");
            }
        };

        reader.readAsText(file);
    }

    startNewGame() {
        this._saveManager.clearSave();

        this._turnSystem.stop();
        this.stopAutoSave();

        location.reload();
    }
}