export default class BuildMenuView {

    constructor(containerId) {
        this._container = document.getElementById(containerId);
    }

    bindBuildingSelection(handler) {
        const buttons = this._container.querySelectorAll("[data-building]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                handler(button.dataset.building, button);
            });
        });
    }

    show() {
        this._container.classList.remove("d-none");
    }

    hide() {
        this._container.classList.add("d-none");
    }
}