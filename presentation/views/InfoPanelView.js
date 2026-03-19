export default class InfoPanelView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    showMessage(message) {
        this._container.innerHTML = `<p>${message}</p>`;
    }

    showRoadInfo(road) {
        this._container.innerHTML = `
            <h3>Road</h3>
            <p>Type: Road</p>
            <p>Build Cost: $${road.cost}</p>
            <p>Sell Value: $${Math.floor(road.cost * 0.5)}</p>
        `;
    }

    showBuildingInfo(building) {
        this._container.innerHTML = `
            <h3>${building.name}</h3>
            <p>Type: ${building.type}</p>
            <p>Category: ${building.category}</p>
            <p>Construction Cost: $${building.constructionCost}</p>
            <p>Sell Value: $${building.getSellValue()}</p>
            <p>Electricity Consumption: ${building.electricityConsumption}</p>
            <p>Water Consumption: ${building.waterConsumption}</p>
        `;
    }

    clear() {
        this._container.innerHTML = `<p>No cell selected.</p>`;
    }
}