"use strict";
import Widget from '../widget';
import CircleTimer from './circle-timer';
import NumericTimer from './numeric-timer';
import requestAnimationFrame from '../utils/requestAnimationFrame'

const DEFAULT_INTERVAL = 25 * 60 * 1000;
const COMPLETE_CODE = {
    COMPLETE: 1,
    STOPPED: 2
}

export default class Timer extends Widget {
    constructor(element, interval) {
        super(element, interval);
        this.interval = interval ||DEFAULT_INTERVAL;
        this._elapsedTime = 0;
    }

    get interval(){ return this._interval; }
    set interval(interval) { this._interval = interval; }

    _render(interval){
        super._render();
        this._circleTimer = new CircleTimer(this._container);
        this._numericTimer = new NumericTimer(this._circleTimer.content, interval);
    }

    start() {
        let that = this;
        let frame = function(){
            let complete = that._frame();
            if(complete)
                return;
            requestAnimationFrame(frame);
        };
        this._startTime = new Date();
        requestAnimationFrame(frame);
    }

    _frame() {
        let currentDate = new Date();
        this._elapsedTime += currentDate - this._startTime;

        this._startTime = currentDate;

        let lastDuration = this._getLastDuration();
        this._circleTimer.updateState(lastDuration);
        this._numericTimer.updateState(lastDuration);

        if(this._elapsedTime >= this.interval){
            this._complete(COMPLETE_CODE.COMPLETE);
            return COMPLETE_CODE.COMPLETE;
        }
    }

    _getLastDuration(){
        let k = this._elapsedTime / this.interval;
        return k > 1 ? 1 : k;
    }

    _complete(code) {

    }
}