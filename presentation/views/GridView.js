export default class GridView {

    /*
     * Constructor de la vista del grid.
     * Guarda la referencia al contenedor del HTML donde se va a dibujar
     * el mapa de la ciudad.
     */
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

     /*
     * Renderiza el mapa en pantalla usando la información del grid.
     * Crea dinámicamente cada celda del mapa y le asigna un evento
     * para detectar cuando el usuario hace clic en ella.
     */
    render(grid, onCellClick) {
        this._container.innerHTML = "";
        this._container.style.display = "grid";
        this._container.style.gridTemplateColumns = `repeat(${grid.width}, 30px)`;
        this._container.style.gap = "2px";

        for (let row = 0; row < grid.cells.length; row++) {
            for (let col = 0; col < grid.cells[row].length; col++) {
                const cell = grid.cells[row][col];

                const cellElement = document.createElement("div");
                cellElement.classList.add("map-cell");
                cellElement.dataset.x = cell.x;
                cellElement.dataset.y = cell.y;

                if (!cell.isEmpty() && cell.content.type === "road") {
                    cellElement.classList.add("road-cell");
                }

                cellElement.addEventListener("click", () => {
                    onCellClick(cell.x, cell.y);
                });

                this._container.appendChild(cellElement);
            }
        }
    }
    

    /*
     * Resalta visualmente la celda que el usuario seleccionó.
     * Primero quita la selección anterior y luego aplica la
     * clase CSS a la nueva celda seleccionada.
     */
    highlightSelectedCell(x, y) {
        const previousSelected = this._container.querySelector(".selected-cell");

        if (previousSelected) {
            previousSelected.classList.remove("selected-cell");
        }

        const newSelected = this._container.querySelector(`[data-x="${x}"][data-y="${y}"]`);

        if (newSelected) {
            newSelected.classList.add("selected-cell");
        }
    }
}