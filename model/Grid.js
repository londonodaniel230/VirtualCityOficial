import Cell from "./Cell.js";

export default class Grid {

    // Crea el grid con el ancho y alto configurados.
    constructor (width, height) {
        this._width = width;
        this._height = height;
        this._cells = [];
    }

    // ======= GETTERS =======

    get width () { 
        return this._width; 
    }

    get height () { 
        return this._height; 
    }

    get cells () { 
        return this._cells; 
    }

    // ======= SETTERS =======

    set width (newWidth) { 
        this._width = newWidth; 
    }

    set height (newHeight) { 
        this._height = newHeight; 
    }

    set cells (newCells) { 
        this._cells = newCells; 
    }

    // ======= METHODS =======

    // Genera todas las celdas vacias del mapa.
    initializeGrid () {
        this._cells = [];

        for (let row = 0; row < this._height; row++) {
            const currentRow = [];

            for (let col = 0; col < this._width; col++) {
                currentRow.push(new Cell(col, row));
            }

            this._cells.push(currentRow);
        }
    }

    // Devuelve la celda solicitada o null si esta fuera del mapa.
    getCell (x, y) {
        if (
            y < 0 || y >= this._height ||
            x < 0 || x >= this._width
        ) {
            return null;
        }

        return this._cells[y][x];
    }

    // Coloca un edificio en una celda vacia.
    placeBuilding (building, x, y) {
        const cell = this.getCell(x, y);

        if (!cell) {
            return false;
        }

        if (!cell.isEmpty()) {
            return false;
        }

        cell.setContent(building);
        return true;
    }

    // Coloca una via en una celda vacia.
    placeRoad (road, x, y) {
        const cell = this.getCell(x, y);

        if (!cell) {
            return false;
        }

        if (!cell.isEmpty()) {
            return false;
        }

        cell.setContent(road);
        return true;
    }

    // Elimina y devuelve el contenido de una celda ocupada.
    removeContent (x, y) {
        const cell = this.getCell(x, y);

        if (!cell) {
            return null;
        }

        if (cell.isEmpty()) {
            return null;
        }

        const removedContent = cell.content;
        cell.removeContent();

        return removedContent;
    }

    // Comprueba si la celda tiene una via en alguna posicion adyacente.
    hasAdjacentRoad(x, y) {
        const directions = [
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 }
        ];

        for (const direction of directions) {
            const neighbor = this.getCell(x + direction.dx, y + direction.dy);

            if (neighbor && !neighbor.isEmpty() && neighbor.content.type === "road") {
                return true;
            }
        }

        return false;
    }
    
}
