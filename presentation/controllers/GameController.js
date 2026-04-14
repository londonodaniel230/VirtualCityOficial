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
import RouteSystem from "../../business/RouteSystem.js";
import RouteApi from "../../data_access/RouteApi.js";
import RankingRepository from "../../data_access/RankingRepository.js";
import RankingView from "../views/RankingView.js";
import WeatherApi from "../../data_access/WeatherApi.js";
import NewsApi from "../../data_access/NewsApi.js";
import WeatherView from "../views/WeatherView.js";
import NewsView from "../views/NewsView.js";

export default class GameController {
    // Prepara referencias del DOM, vistas, APIs y estado principal del juego.
    constructor() {
        this._form = document.getElementById("city-form");
        this._setupSection = document.getElementById("setup-section");
        this._mapSection = document.getElementById("map-section");
        this._infoBar = document.getElementById("info-bar");
        this._infoText = document.getElementById("info-text");
        this._buildRoadButton = document.getElementById("build-road-btn");
        this._demolishButton = document.getElementById("demolish-btn");
        this._infoPanel = document.getElementById("info-panel");
        this._toggleInfoPanelButton = document.getElementById("toggle-info-panel-btn");
        this._closeInfoPanelButton = document.getElementById("close-info-panel-btn");
        this._resourcePanel = document.getElementById("resource-panel");
        this._pauseTurnButton = document.getElementById("pause-turn-btn");
        this._turnTimerText = document.getElementById("turn-timer-text");
        this._citizenSystem = new CitizenSystem(3);

        this._infoPanelView = new InfoPanelView("info-panel-content");
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

        this._routeApi = new RouteApi();
        this._routeOrigin = null;
        this._routeDestination = null;
        this._routeCells = [];
        this._routeButton = document.getElementById("route-btn");

        this._rankingRepository = new RankingRepository();
        this._rankingView = new RankingView("ranking-panel");
        this._rankingPanel = document.getElementById("ranking-panel");

        this._sidePanel = document.getElementById("side-panel");
        this._toggleSidePanelButton = document.getElementById("toggle-side-panel-btn");
        this._closeSidePanelButton = document.getElementById("close-side-panel-btn");

        this._showRankingButton = document.getElementById("show-ranking-btn");
        this._showWeatherButton = document.getElementById("show-weather-btn");
        this._showNewsButton = document.getElementById("show-news-btn");

        this._weatherPanel = document.getElementById("weather-panel");
        this._newsPanel = document.getElementById("news-panel");

        this._city = null;
        this._selectedCell = null;
        this._currentMode = "select";
        this._selectedBuildingType = null;

        this._weatherApi = new WeatherApi("62532b0f6b03512e261a6d40ed17cb2e");
        this._newsApi = new NewsApi("2148d689e9b3477a8807f4424decdea4");

        this._weatherView = new WeatherView("weather-panel");
        this._newsView = new NewsView("news-panel");

        this._weatherRefreshIntervalId = null;
        this._newsRefreshIntervalId = null;

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

    // Registra eventos de la interfaz y recupera opciones de partida guardada.
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

        if (this._routeButton) {
            this._routeButton.addEventListener("click", () => {
                this.setMode("routeSelect", this._routeButton);
                this._routeOrigin = null;
                this._routeDestination = null;
                this._routeCells = [];
                this.renderGrid();
            });
        }

        if (this._toggleSidePanelButton) {
            this._toggleSidePanelButton.addEventListener("click", () => {
                this.toggleSidePanel();
            });
        }

        if (this._closeSidePanelButton) {
            this._closeSidePanelButton.addEventListener("click", () => {
                this.closeSidePanel();
            });
        }

        if (this._toggleInfoPanelButton) {
            this._toggleInfoPanelButton.addEventListener("click", () => {
                this.toggleInfoPanel();
            });
        }

        if (this._closeInfoPanelButton) {
            this._closeInfoPanelButton.addEventListener("click", () => {
                this.closeInfoPanel();
            });
        }

        if (this._showRankingButton) {
            this._showRankingButton.addEventListener("click", () => {
                this.showSideSection("ranking-panel");
            });
        }

        if (this._showWeatherButton) {
            this._showWeatherButton.addEventListener("click", () => {
                this.showSideSection("weather-panel");
            });
        }

        if (this._showNewsButton) {
            this._showNewsButton.addEventListener("click", () => {
                this.showSideSection("news-panel");
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

        window.addEventListener("resize", () => {
            this.syncResponsiveInfoPanel();
        });
    }
    // Crea una ciudad nueva desde el formulario y activa toda la interfaz del juego.
    createCity() {
        const cityName = document.getElementById("cityName").value.trim();
        const mayorName = document.getElementById("mayorName").value.trim();
        const region = document.getElementById("region").value.trim();
        const size = parseInt(document.getElementById("mapSize").value);

        const turnDurationInput = parseInt(document.getElementById("turnDuration").value);
        const turnDuration = isNaN(turnDurationInput) || turnDurationInput < 1 ? 5 : turnDurationInput;
        const coordinates = this.getCoordinatesByRegion(region);

        const grid = new Grid(size, size);
        grid.initializeGrid();

        this._city = new City(
            cityName,
            mayorName,
            region,
            coordinates.lat,
            coordinates.lon,
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

        if (this._toggleInfoPanelButton) {
            this._toggleInfoPanelButton.classList.remove("d-none");
        }

        this.syncResponsiveInfoPanel();
        this.updateResourcePanel();

        this._turnSystem.start();
        this.updateTurnTimer(Math.ceil(this._turnSystem.intervalMs / 1000));
        this.startAutoSave();
        this._saveManager.saveGame(this._city.toJSON());

        this._rankingPanel.classList.remove("d-none");
        this.updateRanking();

        if (this._toggleSidePanelButton) {
            this._toggleSidePanelButton.classList.remove("d-none");
        }

        this.showSideSection("ranking-panel");

        this.startExternalDataRefresh();
    }
    // Redibuja el mapa completo con el estado actual del grid.
    renderGrid() {
        this._gridView.render(this._city.grid, (x, y) => {
            this.handleCellClick(x, y);
        }, this._routeCells);
    }
    // Decide que accion ejecutar segun el modo actual al hacer clic en una celda.
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

        if (this._currentMode === "routeSelect") {
            this.handleRouteSelection(x, y);
            return;
        }

        this.selectCell(x, y);
        this.showBuildingInfo(x, y);
    }
    // Construye una via si la celda esta libre y hay dinero disponible.
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

    // Crea la instancia del edificio segun el tipo seleccionado en la interfaz.
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

    // Construye un edificio validando posicion, carretera adyacente y costo.
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
    // Actualiza la barra superior con el estado general de la ciudad.
    showCityInfo() {
        this._infoText.textContent =
        `City: ${this._city.name} | Mayor: ${this._city.mayor} | Region: ${this._city.region} | Size: ${this._city.mapWidth} x ${this._city.mapHeight} | Turn: ${this._city.currentTurn} | Score: ${this._city.score} `;
    }
    // Guarda la celda seleccionada y la resalta en el mapa.
    selectCell(x, y) {
        this._selectedCell = { x, y };

        this._gridView.highlightSelectedCell(x, y);

        console.log("Selected cell:", this._selectedCell);
    }

    // Cambia el modo actual de interaccion y actualiza el estado visual de los botones.
    setMode(mode, button, extraData = null) {

        const isSameRoadMode =
            mode === "buildRoad" && this._currentMode === "buildRoad";

        const isSameBuildingMode =
            mode === "buildBuilding" &&
            this._currentMode === "buildBuilding" &&
            this._selectedBuildingType === extraData;

        const isSameDemolishMode = 
            mode === "demolish" && this._currentMode === "demolish";

        const isSameRouteMode =
            mode === "routeSelect" && this._currentMode === "routeSelect";

        // Si se pulsa el mismo botÃ³n otra vez, cancelar
        if (isSameRoadMode || isSameBuildingMode || isSameDemolishMode || isSameRouteMode) {
            this._currentMode = "select";
            this._selectedBuildingType = null;
            this._routeOrigin = null;
            this._routeDestination = null;

            if (isSameRouteMode) {
                this._routeCells = [];

                if (this._city) {
                    this.renderGrid();
                }
            }

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
        button.dataset.state = "cancel";
        button.classList.remove("btn-warning", "btn-light");
        button.classList.add("btn-danger");

        console.log(`Mode activated: ${mode}`, extraData);
    }

    // Restablece todos los botones de accion a su apariencia normal.
    resetButtons() {
        const allButtons = document.querySelectorAll("#build-road-btn, #build-menu button, #demolish-btn, #route-btn");

        allButtons.forEach((btn) => {
            btn.classList.remove("btn-danger", "btn-warning");
            btn.classList.add("btn-light");
            btn.dataset.state = "idle";

            if (btn.dataset.defaultLabel) {
                btn.textContent = btn.dataset.defaultLabel;
            }

            if (btn.id === "build-road-btn") {
                btn.classList.remove("btn-light");
                btn.classList.add("btn-warning");
            }
        });
    }

    // Muestra en el panel lateral la informacion de la celda seleccionada.
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

    // Demuele el contenido de una celda y devuelve parte del costo al jugador.
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

    // Refresca el panel de recursos con los datos actuales de la ciudad.
    updateResourcePanel() {
        this._resourcePanelView.render(this._city.resources, this._city);
    }

    // Ejecuta el flujo completo de un turno automatico del juego.
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
        this.saveCurrentScoreToRanking();

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

    // Pausa o reanuda la ejecucion automatica de turnos.
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

    // Actualiza el texto del contador que indica cuando sera el siguiente turno.
    updateTurnTimer(remainingSeconds) {
        if (this._turnTimerText) {
            this._turnTimerText.textContent = `Next Turn In: ${remainingSeconds}s`;
        }
    }

    // Guarda la partida actual en el almacenamiento local.
    saveCurrentGame() {
        if (!this._city) {
            return;
        }

        this._saveManager.saveGame(this._city.toJSON());
        this._infoPanelView.showMessage("Game saved successfully.");
    }

    // Carga la partida almacenada en localStorage y restaura la interfaz.
    loadSavedGame() {
        const savedData = this._saveManager.loadGame();

        if (!savedData) {
            this._infoPanelView.showMessage("No saved game found.");
            return;
        }

        this.restoreGame(savedData);
        this._infoPanelView.showMessage("Saved game loaded successfully.");
    }

    // Exporta la partida actual a un archivo JSON descargable.
    exportCurrentGame() {
        if (!this._city) {
            return;
        }

        this._saveManager.exportToJson(this._city.toJSON());
        this._infoPanelView.showMessage("Game exported to JSON.");
    }

    // Inicia el guardado automatico periodico mientras exista una ciudad activa.
    startAutoSave() {
        this.stopAutoSave();

        this._autoSaveIntervalId = setInterval(() => {
            if (this._city) {
                this._saveManager.saveGame(this._city.toJSON());
                console.log("Auto-save completed.");
            }
        }, 30000);
    }

    // Detiene el intervalo de guardado automatico si estaba activo.
    stopAutoSave() {
        if (this._autoSaveIntervalId) {
            clearInterval(this._autoSaveIntervalId);
            this._autoSaveIntervalId = null;
        }
    }

    // Reconstruye una partida guardada y vuelve a mostrar todas las vistas del juego.
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

        if (this._toggleInfoPanelButton) {
            this._toggleInfoPanelButton.classList.remove("d-none");
        }

        this.syncResponsiveInfoPanel();

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

        // RANKING
        this._rankingPanel.classList.remove("d-none");
        this.updateRanking();

        if (this._toggleSidePanelButton) {
            this._toggleSidePanelButton.classList.remove("d-none");
        }

        this.showSideSection("ranking-panel");

        this.startExternalDataRefresh();
    }

    // Lee un archivo JSON seleccionado por el usuario y restaura la partida.
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
                this._infoPanelView.showMessage("JSON save loaded successfully.");
            } catch (error) {
                console.error(error);
                alert("Could not load the JSON file.");
            }
        };

        reader.readAsText(file);
    }

    // Limpia el guardado actual y reinicia la aplicacion desde cero.
    startNewGame() {
        this._saveManager.clearSave();

        this._turnSystem.stop();
        this.stopAutoSave();

        location.reload();

        this.closeInfoPanel();
        this.closeSidePanel();

        this.stopExternalDataRefresh();
    }

    // Usa dos vias seleccionadas para pedir al backend la mejor ruta entre ellas.
    async handleRouteSelection(x, y) {
        const grid = this._city.grid;
        const cell = grid.getCell(x, y);

        if (!cell || cell.isEmpty() || cell.content.type !== "road") {
            alert("You must select a road cell.");
            return;
        }

        if (!this._routeOrigin) {
            this._routeOrigin = { x, y };
            this._infoPanelView.showMessage(`Route origin selected: (${x}, ${y})`);
            return;
        }

        this._routeDestination = { x, y };

        try {
            const map = RouteSystem.buildMatrix(grid);

            const start = RouteSystem.toApiCoordinate(
                this._routeOrigin.x,
                this._routeOrigin.y
            );

            const end = RouteSystem.toApiCoordinate(
                this._routeDestination.x,
                this._routeDestination.y
            );

            const result = await this._routeApi.calculateRoute(map, start, end);

            this._routeCells = RouteSystem.fromApiRoute(result.route);

            this.renderGrid();

            this._infoPanelView.showMessage(
                `Route calculated successfully. Length: ${result.route.length}`
            );
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            this._routeOrigin = null;
            this._routeDestination = null;
        }
    }

    // Carga el ranking guardado y lo muestra en el panel lateral.
    updateRanking() {
        const ranking = this._rankingRepository.loadRanking();
        this._rankingView.render(ranking);
    }

    // Guarda el puntaje actual de la ciudad dentro del ranking persistente.
    saveCurrentScoreToRanking() {
        if (!this._city) {
            return;
        }

        this._rankingRepository.addScore({
            cityName: this._city.name,
            score: this._city.score
        });

        this.updateRanking();
    }

    // Abre o cierra el panel lateral principal.
    toggleSidePanel() {
        if (!this._sidePanel) {
            return;
        }

        this._sidePanel.classList.toggle("open");
        this._sidePanel.classList.toggle("closed");
    }

    // Cierra el panel lateral principal.
    closeSidePanel() {
        if (!this._sidePanel) {
            return;
        }

        this._sidePanel.classList.remove("open");
        this._sidePanel.classList.add("closed");
    }

    // Muestra una seccion del panel lateral y oculta las demas.
    showSideSection(sectionId) {
        const sections = document.querySelectorAll(".side-panel-section");
        const tabButtons = document.querySelectorAll(".side-tab-btn");

        sections.forEach((section) => {
            section.classList.add("d-none");
        });

        tabButtons.forEach((button) => {
            button.classList.remove("is-active");
        });

        const activeSection = document.getElementById(sectionId);

        if (activeSection) {
            activeSection.classList.remove("d-none");
        }

        const activeButton = document.querySelector(`.side-tab-btn[data-section="${sectionId}"]`);

        if (activeButton) {
            activeButton.classList.add("is-active");
        }
    }

    // Indica si la interfaz esta en un viewport pequeno de celular.
    isSmallMobileViewport() {
        return window.matchMedia("(max-width: 480px)").matches;
    }

    // Ajusta el texto y estado del boton que controla el panel de informacion.
    updateInfoPanelToggleState() {
        if (!this._toggleInfoPanelButton) {
            return;
        }

        const isOpen = this._infoPanel && this._infoPanel.classList.contains("open");
        this._toggleInfoPanelButton.textContent = isOpen ? "Hide Info" : "Info";
        this._toggleInfoPanelButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    // Abre el panel de informacion en pantalla.
    openInfoPanel() {
        if (!this._infoPanel) {
            return;
        }

        this._infoPanel.classList.add("open");
        this.updateInfoPanelToggleState();
    }

    // Cierra el panel de informacion en pantalla.
    closeInfoPanel() {
        if (!this._infoPanel) {
            return;
        }

        this._infoPanel.classList.remove("open");
        this.updateInfoPanelToggleState();
    }

    // Alterna la apertura del panel de informacion en moviles.
    toggleInfoPanel() {
        if (!this._infoPanel || !this.isSmallMobileViewport()) {
            return;
        }

        this._infoPanel.classList.toggle("open");
        this.updateInfoPanelToggleState();
    }

    // Sincroniza el panel de informacion segun el tamano actual de pantalla.
    syncResponsiveInfoPanel() {
        if (!this._infoPanel || this._infoPanel.classList.contains("d-none")) {
            return;
        }

        if (this.isSmallMobileViewport()) {
            this.closeInfoPanel();
            return;
        }

        this.openInfoPanel();
    }

    // Consulta el clima actual de la region de la ciudad y lo muestra.
    async loadWeather() {
        if (!this._city) {
            return;
        }

        try {
            const weatherData = await this._weatherApi.getWeather(
                this._city.latitude,
                this._city.longitude
            );

            this._weatherView.render(weatherData);
        } catch (error) {
            console.error(error);
            this._weatherView.showError("Could not load weather data.");
        }
    }

    // Consulta noticias de la region actual y usa alternativas si no hay resultados.
    async loadNews() {
        if (!this._city) {
            return;
        }

        try {
            const countryCode = this.getCountryCodeFromRegion(this._city.region);
            let newsItems = await this._newsApi.getTopHeadlines(countryCode);

            if (!newsItems || newsItems.length === 0) {
                newsItems = await this._newsApi.searchNews(this._city.region);
            }

            if (!newsItems || newsItems.length === 0) {
                newsItems = await this._newsApi.getTopHeadlines("us");
            }

            this._newsView.render(newsItems);
        } catch (error) {
            console.error(error);
            this._newsView.showError("Could not load news.");
        }
    }

    // Convierte el nombre de una region en el codigo de pais usado por NewsAPI.
    getCountryCodeFromRegion(region) {
        const normalized = region.trim().toLowerCase();

        const regionMap = {
            colombia: "co",
            bogota: "co",
            medellin: "co",
            cali: "co",
            barranquilla: "co",
            cartagena: "co",
            bucaramanga: "co",
            cucuta: "co",
            pereira: "co",
            manizales: "co",
            "santa marta": "co",

            mexico: "mx",
            argentina: "ar",
            brazil: "br",
            chile: "cl",
            peru: "pe",
            spain: "es",
            france: "fr",
            germany: "de",
            italy: "it",
            usa: "us",
            "united states": "us",
            uk: "gb",
            "united kingdom": "gb"
        };

        return regionMap[normalized] || "us";
    }

    // Inicia la carga periodica de clima y noticias externas.
    startExternalDataRefresh() {
        this.stopExternalDataRefresh();

        this.loadWeather();
        this.loadNews();

        this._weatherRefreshIntervalId = setInterval(() => {
            this.loadWeather();
        }, 1800000);

        this._newsRefreshIntervalId = setInterval(() => {
            this.loadNews();
        }, 1800000);
    }

    // Detiene los intervalos de actualizacion de clima y noticias.
    stopExternalDataRefresh() {
        if (this._weatherRefreshIntervalId) {
            clearInterval(this._weatherRefreshIntervalId);
            this._weatherRefreshIntervalId = null;
        }

        if (this._newsRefreshIntervalId) {
            clearInterval(this._newsRefreshIntervalId);
            this._newsRefreshIntervalId = null;
        }
    }

    // Devuelve coordenadas aproximadas para la region escrita por el usuario.
    getCoordinatesByRegion(region) {
        const normalizedRegion = region.trim().toLowerCase();

        const regionCoordinates = {
            bogota: { lat: 4.7110, lon: -74.0721 },
            medellin: { lat: 6.2442, lon: -75.5812 },
            cali: { lat: 3.4516, lon: -76.5320 },
            barranquilla: { lat: 10.9685, lon: -74.7813 },
            cartagena: { lat: 10.3910, lon: -75.4794 },
            bucaramanga: { lat: 7.1193, lon: -73.1227 },
            cucuta: { lat: 7.8939, lon: -72.5078 },
            pereira: { lat: 4.8133, lon: -75.6961 },
            manizales: { lat: 5.0703, lon: -75.5138 },
            "santa marta": { lat: 11.2408, lon: -74.1990 },

            colombia: { lat: 4.5709, lon: -74.2973 },
            mexico: { lat: 23.6345, lon: -102.5528 },
            argentina: { lat: -38.4161, lon: -63.6167 },
            brazil: { lat: -14.2350, lon: -51.9253 },
            chile: { lat: -35.6751, lon: -71.5430 },
            peru: { lat: -9.1900, lon: -75.0152 },
            spain: { lat: 40.4637, lon: -3.7492 },
            france: { lat: 46.2276, lon: 2.2137 },
            germany: { lat: 51.1657, lon: 10.4515 },
            italy: { lat: 41.8719, lon: 12.5674 },
            "united states": { lat: 37.0902, lon: -95.7129 },
            usa: { lat: 37.0902, lon: -95.7129 },
            uk: { lat: 55.3781, lon: -3.4360 },
            "united kingdom": { lat: 55.3781, lon: -3.4360 }
        };

        return regionCoordinates[normalizedRegion] || { lat: 4.5709, lon: -74.2973 };
    }
}

