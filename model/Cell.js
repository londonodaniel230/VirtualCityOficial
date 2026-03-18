export default class Cell {

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

    isEmpty () {
        return this._content === null;
    }

    removeContent () {
        this._content = null;
    }

    setContent(content) {
        this._content = content;
    }
}