"use strict";
import './layout.styl';
import Widget from '../widget';

import TimeView from './views/timeview';
import LoginView from './views/login';

const defaultView = 'login';
const Routes = {
  'timer': TimeView,
  'login': LoginView
};

export default class Layout extends Widget {
  _render() {
    this._views = {};
    this._renderView(defaultView);

    document.addEventListener('navigate', this._route.bind(this));
  }

  _route(e) {
    this._renderView(e.detail.url, e.detail.options);
  }

  _renderView(viewName, state) {
    let view = this._getViewByName(viewName);
    this._setView(view, state);
  }

  _setView(view, state) {
    this._currentView && this._container.removeChild(this._currentView.view);
    this._currentView = view;
    this._container.appendChild(this._currentView.render());
  }

  _getViewByName(viewName) {
    if (!this._views[viewName])
      this._views[viewName] = new Routes[viewName];

    return this._views[viewName];
  }
}
