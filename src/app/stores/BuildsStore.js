var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  builds: {},
  query: false
};

var setState = (newState) => {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
};

var update = (updates) => {
  var key = updates.url;
  state.builds[key] = assign({}, state.builds[key], updates);
  events.emit(CHANGE_EVENT);
};

var createBuildsIfNeeded = (builds) => {
  var newBuilds = builds.reduce((prev, curr) => {
    if(state.builds.hasOwnProperty(curr)) {
      prev[curr] = state.builds[curr];
    } else {
      prev[curr] = {
        job: {},
        lastBuild: {},
        url: curr
      };
    }
    return prev;
  }, {});
  setState({
    builds: newBuilds,
    query: true
  });
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
  console.log('BuildsStore', action.type);
  if (action.type === ActionTypes.BUILD_LOADED) {
    update(action.build);
  } else if (action.type === ActionTypes.BUILDS_GRABBED) {
    createBuildsIfNeeded(action.builds);
  } else if (action.type === ActionTypes.NO_QUERY) {
    setState({
      builds: {},
      query: false
    });
  }
});

module.exports = BuildsStore;
