"use strict";
import Widget from '../widget';
import './layout.styl';
import template from './layout.jade';

import Toolbar from './toolbar';

import TimeView from './views/timeview';

export default class Layout extends Widget {
    _render() {
        this._container.innerHTML = template();
        this._toolbarElement= this._container.querySelector('.layout_toolbar');
        this._toolbar = new Toolbar(this._toolbarElement, {title: 'Test'});

        this._content = this._container.querySelector('.layout_content');
        this._view = new TimeView();
        this._view.render(this._content);
    }
}