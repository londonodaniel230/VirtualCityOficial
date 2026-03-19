import Cell from "./Cell.js";

export default class Grid {

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

    getCell (x, y) {
        if (
            y < 0 || y >= this._height ||
            x < 0 || x >= this._width
        ) {
            return null;
        }

        return this._cells[y][x];
    }

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

    removeContent (x, y) {
        const cell = this.getCell(x, y);

        if (!cell) {
            return false;
        }

        cell.removeContent();
        return true;
    }

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