var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  builds: [],
  loaded: false
};

var setState = (newState) => {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
};

var BuildsStore = {
  addChangeListener (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState () {
    return state;
  }
};

BuildsStore.dispatchToken = AppDispatcher.register((payload) => {
  var { action } = payload;
  console.log(action.type);
  if (action.type === ActionTypes.BUILDS_LOADED) {
    setState({
      loaded: true,
      builds: action.builds
    });
  }
});

module.exports = BuildsStore;

