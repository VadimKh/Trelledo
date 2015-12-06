"use strict";
import './main.styl';
import CircleTimer from './classes/timer/circle-timer';
import NumericTimer from './classes/timer/numeric-timer';
import Timer from './classes/timer';

document.addEventListener("DOMContentLoaded", function(event) {
    var timer = document.getElementById("timer");
    var timer = new Timer(timer, 60 * 1000);
    timer.start();
});
