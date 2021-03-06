"use strict";
import audio from '../../../audio/complete.mp3';

import BaseTimer from '../base.timer';
import CircleTimer from './circle-timer';
import NumericTimer from './numeric-timer';
import requestAnimationFrame from '../../utils/requestAnimationFrame'

const DEFAULT_INTERVAL = 25 * 60 * 1000;
const STATE_CODES = {
    RUN: 0,
    WAITING: 1,
    STOPPED: 2,
    COMPLETE: 3
};

const cordova = window.cordova;

export default class Timer extends BaseTimer {
    get interval(){ return this._interval; }
    set interval(interval) { this._interval = interval; }

    get state() {return this._state;}
    set state(state) {
        super.state = state;
        this._numericTimer.state = state;
    }

    _render(interval) {
        this._sheduleID = 1;
        super._render();
        this.interval = interval ||DEFAULT_INTERVAL;
        this._elapsedTime = 0;

        this._circleTimer = new CircleTimer(this._container);
        this._numericTimer = new NumericTimer(this._circleTimer.content, interval);
        this.state = STATE_CODES.WAITING;
        this._attachEventHandlers();

        this._completeSound = new Audio('audio/complete.mp3');
    }

    _attachEventHandlers() {
        var timer = this;
        this._container.addEventListener("click", function(){
            if(timer.state === STATE_CODES.COMPLETE)
                return;
            if(timer.state === STATE_CODES.RUN)
                timer.stop();
            else
                timer.start();
        })
    }

    start() {
        let that = this;
        this.state = STATE_CODES.RUN;
        this._startTime = new Date();
        this._sheduleNotify();

        let frame = function(){
            let complete = that._frame();
            if(complete)
                return;
            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    }

    stop() {
        this.state = STATE_CODES.STOPPED;
        this._cleanNotify();
    }

    _sheduleNotify(){
        if(!cordova)
            return;
        cordova.plugins.notification.local.schedule({
            id: this._sheduleID,
            text: "Single Notification",
            sound: 'file://audio/complete.mp3',
            at: new Date(this._startTime.getTime() + this.interval - this._elapsedTime),
            led: '222C36'
        });
    }

    _cleanNotify(){
        if(!cordova)
            return;
        let oldID = this._sheduleID;
        this._sheduleID += 1;
        cordova.plugins.notification.local.cancel(oldID, function(){
            cordova.plugins.notification.local.clear(oldID);
        });
    }

    _frame() {
        let currentDate = new Date();
        this._elapsedTime += currentDate - this._startTime;

        this._startTime = currentDate;

        let lastDuration = this._getLastDuration();
        this._circleTimer.updateState(lastDuration);
        this._numericTimer.updateState(lastDuration);

        if(this._elapsedTime >= this.interval){
            this._complete();

        }
        return this.state;
    }

    _getLastDuration(){
        let k = this._elapsedTime / this.interval;
        return k > 1 ? 1 : k;
    }

    _complete() {
        this.state = STATE_CODES.COMPLETE;
        //this._completeSound.play();
    }
}
