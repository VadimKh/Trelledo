"use strict";
class CircleTimer {
    constructor(element, radius, size) {
        "use strict";
        this._parent = element;
        this._radius = radius;
        this._size = size;


        this.START_ANGLE_LEFT_HALF =  135;
        this.START_ANGLE_RIGHT_HALF =  -45;
        this.MAX_ANGLE = 360;
    }

    render() {
        "use strict";
        this._renderContainer();
        this._renderSide('left');
        this._renderSide('right');

        this._parent.appendChild(this._container);
    }

    _renderContainer(){
        this._container = this._renderNode('circle-timer');
        this._container.style.width = this._radius + 'px';
        this._container.style.height = this._radius + 'px';
    }

    _renderSide(sideName){
        var container = this['_' + sideName + 'Container'] = this._renderNode('circle-timer_' + sideName + '-container');
        this._container.appendChild(container);

        var half = this['_' + sideName + 'Half'] = this._renderNode('circle-timer_' + sideName + '-half');
        half.style.borderWidth = this._size + 'px';
        container.appendChild(half);
    }

    _renderNode(className) {
        "use strict";
        var node = document.createElement('div');
        node.className = className;
        return node;
    }

    moveTo(k) {
        var dec = k - Math.floor(k);
        var rightCoefficient = dec > .5 ? .5 : dec;
        var leftCoefficient = dec > .5 ? dec - .5 : 0;

        var rightAngle = this.START_ANGLE_RIGHT_HALF + this.MAX_ANGLE * rightCoefficient;
        var leftAngle = this.START_ANGLE_LEFT_HALF + this.MAX_ANGLE * leftCoefficient;

        this._leftHalf.style.transform = 'rotate(' + leftAngle + 'deg)';
        this._rightHalf.style.transform = 'rotate(' + rightAngle+ 'deg)';
    }
}



document.addEventListener("DOMContentLoaded", function(event) {
    var timer = document.getElementById("timer");
    var minuteCircle = new CircleTimer(timer, 100, 4);
    minuteCircle.render();
    var counter =  0;
    setInterval(function(){
        counter += .05;
        minuteCircle.moveTo(counter);
    }, 50);
});