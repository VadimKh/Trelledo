"use strict";
import View from '../';
import './timeview.styl';
import template from './timeview.jade';
import Timer from '../../../widget/timer';

export default class TimeView extends View {

    get title() {return 'ToDo'}

    _renderViewContent() {
        let div = document.createElement('div');
        div.innerHTML = template();
        this.view.appendChild(div);
        this._timerElement = this._view.querySelector('.timer');
        this._timer = new Timer(this._timerElement,  5 * 1000);
    }
}
