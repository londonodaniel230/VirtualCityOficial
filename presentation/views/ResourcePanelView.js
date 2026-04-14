export default class ResourcePanelView {
    // Guarda el contenedor del panel de recursos de la ciudad.
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    // Muestra recursos, poblacion y estado general de la ciudad.
    render(resources, city = null) {
        const population = city ? city.getPopulation() : 0;
        const housed = city ? city.citizens.filter((citizen) => citizen.hasHouse).length : 0;
        const employed = city ? city.citizens.filter((citizen) => citizen.hasEmployment).length : 0;
        const averageHappiness = city ? city.averageHappiness : 0;

        this._container.innerHTML = `
            <div class="resource-item">
                <span class="resource-label">Money</span>
                <strong class="resource-value">$${resources.money}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Electricity</span>
                <strong class="resource-value">${resources.electricity}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Water</span>
                <strong class="resource-value">${resources.water}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Food</span>
                <strong class="resource-value">${resources.food}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Population</span>
                <strong class="resource-value">${population}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Housed</span>
                <strong class="resource-value">${housed}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Employed</span>
                <strong class="resource-value">${employed}</strong>
            </div>
            <div class="resource-item">
                <span class="resource-label">Avg Happiness</span>
                <strong class="resource-value">${averageHappiness.toFixed(2)}</strong>
            </div>
        `;
    }
}
