export default class BuildValidator {

    static canBuildBuilding(grid, resources, building, x, y) {
        const cell = grid.getCell(x, y);

        if (!cell) {
            return {
                valid: false,
                message: "Invalid cell."
            };
        }

        if (!cell.isEmpty()) {
            return {
                valid: false,
                message: "This cell is already occupied."
            };
        }

        if (!grid.hasAdjacentRoad(x, y)) {
            return {
                valid: false,
                message: "A building needs an adjacent road."
            };
        }

        if (!resources.canAfford(building.constructionCost)) {
            return {
                valid: false,
                message: "Not enough money."
            };
        }

        return {valid: true, message: "OK"};
    }
}