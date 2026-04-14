export default class InfoPanelView {
    // Guarda el contenedor del panel que muestra detalles de la celda.
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    // Muestra un mensaje simple dentro del panel de informacion.
    showMessage(message) {
        this._container.innerHTML = `
            <div class="info-empty-state">
                <p>${message}</p>
            </div>
        `;
    }

    // Muestra la informacion basica de una via seleccionada.
    showRoadInfo(road) {
        this._container.innerHTML = `
            <h3 class="info-panel-title">Road</h3>
            <div class="info-stat-list">
                <div class="info-stat-row">
                    <span>Type</span>
                    <strong>Road</strong>
                </div>
                <div class="info-stat-row">
                    <span>Build Cost</span>
                    <strong>$${road.cost}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Sell Value</span>
                    <strong>$${Math.floor(road.cost * 0.5)}</strong>
                </div>
            </div>
        `;
    }

    // Muestra la informacion principal del edificio seleccionado.
    showBuildingInfo(building) {
        this._container.innerHTML = `
            <h3 class="info-panel-title">${building.name}</h3>
            <div class="info-stat-list">
                <div class="info-stat-row">
                    <span>Type</span>
                    <strong>${building.type}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Category</span>
                    <strong>${building.category}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Construction Cost</span>
                    <strong>$${building.constructionCost}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Sell Value</span>
                    <strong>$${building.getSellValue()}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Electricity Consumption</span>
                    <strong>${building.electricityConsumption}</strong>
                </div>
                <div class="info-stat-row">
                    <span>Water Consumption</span>
                    <strong>${building.waterConsumption}</strong>
                </div>
            </div>
        `;
    }

    // Restablece el panel a su estado vacio por defecto.
    clear() {
        this._container.innerHTML = `
            <div class="info-empty-state">
                <p>No cell selected.</p>
            </div>
        `;
    }
}
