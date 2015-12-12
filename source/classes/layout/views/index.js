"use strict";

export default class View {
    constructor() {
    }

    get title() {return ''}

    render(container){
        this._renderView(container);
    }

    _renderView(container) {
        if(this._view)
            return this._view;

        this._view = document.createElement("div");
        this._view.classList.add("view");
        container.appendChild(this._view);
        this._renderViewContent();
    }

    _renderViewContent(){}
}