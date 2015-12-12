"use strict";

export default class Widget {
    constructor(element, ...args) {
        this._container = element;
        this._render.apply(this, args);
    }

    _render(){ }
}