"use strict";
import './numeric.styl';
import template from './numeric.jade';
import BaseTimer from '../../widget/base.timer';

const round = Math.round;
const floor = Math.floor;

export default class NumericTimer extends BaseTimer {

    get interval(){ return this._interval;}
    set interval(interval) { this._interval = interval; }

    _render(interval){
        super._render();
        this.interval = interval || 5 * 60 * 1000;
        this._container.innerHTML = template();
        this._minutes = this._container.querySelector('.numeric-timer_minutes');
        this._lastMinuteValue = 0;
        this._lastSecondValue = 0;
        this._seconds = this._container.querySelector('.numeric-timer_seconds');
        this.updateState();
    }

    updateState(k) {
        k = k || 0;
        let lastTime = this._getLastTime(k);
        let minute = floor(lastTime / 1000 / 60);
        let second = round((lastTime - minute * 1000 * 60) / 1000);
        if(second === 60) {
            minute += 1;
            second = 0;
        }

        this._renderTimer(this._numberToString(minute), this._numberToString(second));
    }

    _renderTimer(minute, second) {
        if(minute !== this._lastMinuteValue) {
            this._lastMinuteValue = minute;
            this._minutes.innerHTML = this._lastMinuteValue;
        }
        if(second !== this._lastSecondValue) {
            this._lastSecondValue = second;
            this._seconds.innerHTML = this._lastSecondValue;
        }
    }

    _numberToString(number) {
        return ('00' + number).slice(-2);
    }

    _getLastTime(k) {
        let interval = this._interval;
        return round(interval - interval * k);
    }
}