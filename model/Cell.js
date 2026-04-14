export default class Cell {

    // Representa una posicion del mapa y su contenido actual.
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._content = null;
    }

    // ======= GETTERS =======

    get x () { 
        return this._x; 
    }

    get y () { 
        return this._y; 
    }

    get content () { 
        return this._content; 
    }

    // ======= SETTERS =======

    set x (newX) { 
        this._x = newX; 
    }
    set y (newY) { 
        this._y = newY;
    }

    set content (newContent) { 
        this._content = newContent; 
    }

    // ======= METHODS =======

    // Indica si la celda no tiene ninguna construccion.
    isEmpty () {
        return this._content === null;
    }

    // Elimina el contenido actual de la celda.
    removeContent () {
        this._content = null;
    }

    // Asigna un edificio o via como contenido de la celda.
    setContent(content) {
        this._content = content;
    }
}
