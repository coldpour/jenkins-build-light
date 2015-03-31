var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedBuild (build) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.BUILD_LOADED,
      build: build
    });
  }
};

module.exports = ServerActionCreators;

