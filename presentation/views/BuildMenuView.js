export default class BuildMenuView {

    // Guarda la referencia al contenedor del menu de construccion.
    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    // Conecta cada boton del menu con la accion de seleccionar un edificio.
    bindBuildingSelection(handler) {
        const buttons = this._container.querySelectorAll("[data-building]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                handler(button.dataset.building, button);
            });
        });
    }

    // Muestra el menu de construccion.
    show() {
        this._container.classList.remove("d-none");
    }

    // Oculta el menu de construccion.
    hide() {
        this._container.classList.add("d-none");
    }
}
