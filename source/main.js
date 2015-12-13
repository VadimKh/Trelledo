"use strict";
import './icon.png';
import './main.styl';

import Layout from './classes/layout';

document.addEventListener("DOMContentLoaded", function(event) {
    let viewport = document.getElementById("viewport");
    let layout = new Layout(viewport);
});
