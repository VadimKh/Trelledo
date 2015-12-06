"use strict";
import './main.styl';
import CircleTimer from './classes/circle';

document.addEventListener("DOMContentLoaded", function(event) {
    var timer = document.getElementById("timer");
    var minuteCircle = new CircleTimer(timer, 200, 5);
    minuteCircle.render();
    var counter =  0;
    setInterval(function(){
        counter += .05;
        minuteCircle.moveTo(counter);
    }, 50);
});
