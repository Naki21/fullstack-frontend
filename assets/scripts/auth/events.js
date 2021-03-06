'use strict';


const getFormFields = require(`../../../lib/get-form-fields`);
const store = require('../store');
const api = require('./api');
const ui = require('./ui');

const onSignUp = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signUp(data)
    .catch(ui.failure);
  $('#sign-up-modal').modal('hide');
};

const onSignIn = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.failure);
};

const onChangePassword = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.changePassword(data)
    .catch(ui.failure);
};
//There is a better way to log out individual player
const onSignOut = function(event) {
  event.preventDefault();
  api.signOut(store.user)
    .then(ui.signOutSuccess)
    .catch(ui.failure);
};


const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
  $('#sign-out-button').on('click', onSignOut);
};

module.exports = {
  addHandlers,
};
