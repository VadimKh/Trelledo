"use strict";
import './view.styl';
import Toolbar from '../../widget/toolbar';

export default class View {
  constructor() {}

  get title(){
    return "View";
  }

  get view() {
    return this._view;
  }
  set view(view){
    this._view = view;
  }

  render(options) {
    this._setOptions(options);
    return this._renderView();
  }

  _renderView() {
    if (this.view)
      return this.view;

    this.view = document.createElement("div");
    this.view.classList.add("view-container");
    this._renderViewToolbar();
    this._renderViewContent();
    return this.view;
  }

  navigate(viewName, options) {
    let event = new CustomEvent('navigate', {detail: {
      url: viewName,
      options: options
    }});
    document.dispatchEvent(event);
  }

  _setOptions(options) {}
  _renderViewToolbar(){
    let toolbar = document.createElement("div");
    this._toolbar = new Toolbar(toolbar, {
      title: this.title
    });
    this.view.appendChild(toolbar);
  }
  _renderViewContent() {}
}
