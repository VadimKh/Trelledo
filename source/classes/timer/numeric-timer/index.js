"use strict";
import './numeric.styl';
import template from './numeric.jade';
import Widget from '../../widget';

const round = Math.round;
const floor = Math.floor;

export default class NumericTimer extends Widget {
    constructor(element, interval) {
        super(element);
        this.interval = interval || 5 * 60 * 1000;
    }

    get interval(){
        return this._interval;
    }

    set interval(interval) {
        this._interval = interval;
    }

    _render(){
        super._render();
        this._container.innerHTML = template();
        this._content = this._container.querySelector('.numeric-timer_content');
        this.updateState();
    }

    updateState(k) {
        k = k ||0;
        this._content.innerHTML = this._getLastTimeFormatted(k);
    }

    _getLastTimeFormatted(k) {
        let lastTime = this._getLastTime(k);
        let minute = floor(lastTime / 1000 / 60);
        let second = round((lastTime - minute * 1000 * 60) / 1000);
        if(second === 60) {
            minute += 1;
            second = 0;
        }
        return this._numberToString(minute) + ':' + this._numberToString(second);
    }

    _numberToString(number) {
        return ('00' + number).slice(-2);
    }

    _getLastTime(k) {
        let interval = this._interval;
        return round(interval - interval * k);
    }
}