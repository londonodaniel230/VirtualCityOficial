export default class ResourcePanelView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(resources, city = null) {
        this._container.innerHTML = `
            <div class="resource-item"><strong>Money:</strong> $${resources.money}</div>
            <div class="resource-item"><strong>Electricity:</strong> ${resources.electricity}</div>
            <div class="resource-item"><strong>Water:</strong> ${resources.water}</div>
            <div class="resource-item"><strong>Food:</strong> ${resources.food}</div>
            <div class="resource-item"><strong>Avg Happiness:</strong> ${city ? city.averageHappiness : 0}</div>
        `;
    }
}