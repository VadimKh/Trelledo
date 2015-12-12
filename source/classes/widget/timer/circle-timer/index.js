"use strict";
import './circle.styl';
import template from './circle.jade';
import BaseTimer from '../../base.timer';

const START_ANGLE_LEFT_HALF =  135;
const START_ANGLE_RIGHT_HALF =  -45;
const MAX_ANGLE = 360;

export default class CircleTimer extends BaseTimer {

  _render() {
    super._render();
    this._container.innerHTML = template();
    this._leftHalf = this._container.querySelector('.circle-timer_left_half');
    this._rightHalf = this._container.querySelector('.circle-timer_right_half');
    this._content = this._container.querySelector('.circle-timer_content');
  }

  get content() { return this._content; }

  updateState(dec) {
    let rightCoefficient = dec > .5 ? .5 : dec;
    let leftCoefficient = dec > .5 ? dec - .5 : 0;

    let rightAngle = START_ANGLE_RIGHT_HALF + MAX_ANGLE * rightCoefficient;
    let leftAngle = START_ANGLE_LEFT_HALF + MAX_ANGLE * leftCoefficient;

    this._leftHalf.style.transform = 'rotate(' + leftAngle + 'deg)';
    this._rightHalf.style.transform = 'rotate(' + rightAngle+ 'deg)';
  }
}
