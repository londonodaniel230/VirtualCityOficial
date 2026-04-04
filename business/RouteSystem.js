export default class RouteSystem {
    static buildMatrix(grid) {
        return grid.cells.map((row) =>
            row.map((cell) => {
                if (!cell.isEmpty() && cell.content.type === "road") {
                    return 1;
                }

                return 0;
            })
        );
    }

    static toApiCoordinate(x, y) {
        return [y, x];
    }

    static fromApiRoute(route) {
        return route.map(([row, col]) => ({
            x: col,
            y: row
        }));
    }
}