export default class ResourcePanelView {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    render(resources, city = null) {
        const population = city ? city.getPopulation() : 0;
        const housed = city ? city.citizens.filter((citizen) => citizen.hasHouse).length : 0;
        const employed = city ? city.citizens.filter((citizen) => citizen.hasEmployment).length : 0;
        const averageHappiness = city ? city.averageHappiness : 0;

        this._container.innerHTML = `
            <div class="resource-item"><strong>Money:</strong> $${resources.money}</div>
            <div class="resource-item"><strong>Electricity:</strong> ${resources.electricity}</div>
            <div class="resource-item"><strong>Water:</strong> ${resources.water}</div>
            <div class="resource-item"><strong>Food:</strong> ${resources.food}</div>
            <div class="resource-item"><strong>Population:</strong> ${population}</div>
            <div class="resource-item"><strong>Housed:</strong> ${housed}</div>
            <div class="resource-item"><strong>Employed:</strong> ${employed}</div>
            <div class="resource-item"><strong>Avg Happiness:</strong> ${averageHappiness.toFixed(2)}</div>
        `;
    }
}