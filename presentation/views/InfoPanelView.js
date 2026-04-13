export default class InfoPanelView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    showMessage(message) {
        this._container.innerHTML = `
            <div class="info-empty-state">
                <p>${message}</p>
            </div>
        `;
    }

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

    clear() {
        this._container.innerHTML = `
            <div class="info-empty-state">
                <p>No cell selected.</p>
            </div>
        `;
    }
}
