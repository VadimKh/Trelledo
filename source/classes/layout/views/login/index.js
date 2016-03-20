"use strict";
import View from '../';
import './login.styl';
import template from './login.jade';

const Trello = window.Trello;

export default class LoginView extends View {
  get title() {
    return 'Login';
  }

  connectTrelloAccount(){
    Trello.authorize({
      type: 'redirect',
      name: 'Getting Started Application',
      scope: {
        read: true,
        write: true },
      expiration: 'never',
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
  }

  authenticationSuccess() { console.log('Successful authentication'); }
  authenticationFailure() { console.log('Failed authentication'); }

  _renderViewContent() {
    let content = document.createElement("div");
    content.innerHTML = template();

    this.view.appendChild(content);
    this.view.querySelector('#connectTrello').addEventListener('click', this.connectTrelloAccount);
    let that = this;
    this.view.querySelector('#go').addEventListener('click', function(){
      that.navigate('timer');
    });
  }
}
