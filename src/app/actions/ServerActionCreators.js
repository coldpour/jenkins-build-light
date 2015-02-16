var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedBuilds (builds) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.BUILDS_LOADED,
      builds: builds
    });
  }
};

module.exports = ServerActionCreators;

