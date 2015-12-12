"use strict";
import Widget from '../../widget';
import './toolbar.styl';
import template from './toolbar.jade';

export default class Toolbar extends Widget {
    _render(args) {
        this._container.classList.add("toolbar");
        this._container.innerHTML = template({title: args.title});
        this._title = args.title;
    }
}

