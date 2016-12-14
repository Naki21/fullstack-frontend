'use strict';
const store = require('../store.js');
const showRandomFighter = require('../templates/show-random-fighter.handlebars');
const showFightBox = require('../templates/fightbox.handlebars');
const showFighterIndex = require('../templates/fighter-index.handlebars');
const battle_button = require('../templates/new-battle-button.handlebars');
const play_again = require('../templates/play-again-button.handlebars');
const success = (data) => {
  console.log('Success');
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const getAllFightersSuccess = (fighters) => {
  console.log(fighters);
  $("#fighterDisplay").html(showFighterIndex(fighters));

};
const getRandomSuccess = (hash) => {
  let source = hash.data;
  console.log(source);
  $("#fighterDisplay").html(showRandomFighter(source));
  store.temp_fighter = source;
};
const deleteFighterSuccess = function(id) {
  id = "#fighter-" + id;
  $(id).hide();
};
const setRandomSuccess = (data) => {
  console.log(data);
  store.current_fighter = data.fighter.id;
  $('#get-fighter-button').hide();
  $('.lead').fadeOut(600, function() {
    $(this).html('Click Begin to enter the arena').fadeIn(600);
  });
  $('#fighterDisplay').html(battle_button());
};

const createBattleSuccess = (data) => {
  let oppo = data.battle;
  store.battle = data.battle;
  console.log(oppo);
  $('.lead').fadeOut(600);
  $('#fighterDisplay').html(showFightBox(oppo));
  $('#create-battle-button').hide(500);
  $('#calc-win-button').fadeIn(500);
};


const winState = function(win) {
  if (win === true) {
    $('#fightbox').fadeOut(500);
    $('.lead').fadeIn(600).html('YOU WIN!');
    $('#fighterDisplay').html(play_again());


  } else {
    $('#fightbox').fadeOut(500);
    $('.lead').fadeIn(600).html('YOU LOSE!');
    $('#fighterDisplay').html(play_again());

  }
};

module.exports = {
  deleteFighterSuccess,
  winState,
  getAllFightersSuccess,
  createBattleSuccess,
  setRandomSuccess,
  getRandomSuccess,
  success,
  failure
};
