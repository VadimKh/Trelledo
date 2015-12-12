"use strict";
import Widget from '../widget';

export default class BaseTimer extends Widget {
    get state() {return this._state;}
    set state(state) {
        this._container.classList.remove("-state" + this._state);
        this._container.classList.add("-state" + state);
        this._state = state;
    }
}