export default class ScoreSystem {
    // Calcula el puntaje total segun poblacion, recursos, edificios y felicidad.
    static calculate(city) {
        const buildings = city.getAllBuildings();
        const population = city.getPopulation();

        let unemployedCitizens = 0;

        for (const citizen of city.citizens) {
            if (!citizen.hasEmployment) {
                unemployedCitizens += 1;
            }
        }

        let score =
            (population * 10) +
            (city.averageHappiness * 5) +
            (city.resources.money / 100) +
            (buildings.length * 50) +
            (city.resources.electricityBalance * 2) +
            (city.resources.waterBalance * 2);

        // Bonificaciones
        if (population > 0 && unemployedCitizens === 0) {
            score += 500;
        }

        if (city.averageHappiness > 80) {
            score += 300;
        }

        if (
            city.resources.electricity > 0 &&
            city.resources.water > 0 &&
            city.resources.food > 0
        ) {
            score += 200;
        }

        if (population > 1000) {
            score += 1000;
        }

        // Penalizaciones
        if (city.resources.money < 0) {
            score -= 500;
        }

        if (city.resources.electricity < 0) {
            score -= 300;
        }

        if (city.resources.water < 0) {
            score -= 300;
        }

        if (city.averageHappiness < 40) {
            score -= 400;
        }

        score -= unemployedCitizens * 10;

        return Math.floor(score);
    }
}
