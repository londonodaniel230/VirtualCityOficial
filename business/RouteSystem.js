export default class RouteSystem {
    // Convierte el grid en una matriz donde las vias valen 1 y lo demas 0.
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

    // Adapta coordenadas del juego al formato fila-columna esperado por la API.
    static toApiCoordinate(x, y) {
        return [y, x];
    }

    // Convierte la ruta recibida de la API al formato x-y usado por la vista.
    static fromApiRoute(route) {
        return route.map(([row, col]) => ({
            x: col,
            y: row
        }));
    }
}
