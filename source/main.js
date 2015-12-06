"use strict";
import './main.styl';
import CircleTimer from './classes/circle-timer';
import NumericTimer from './classes/numeric-timer';

document.addEventListener("DOMContentLoaded", function(event) {
    var timer = document.getElementById("timer");
    var minuteCircle = new CircleTimer(timer);
    var numericTimer = new NumericTimer(minuteCircle.content);
    var counter =  0;
    setInterval(function(){
        counter += .001;
        minuteCircle.updateState(counter);
        numericTimer.updateState(counter);
        counter = counter >= 1 ? 0 : counter;
    }, 50);
});
