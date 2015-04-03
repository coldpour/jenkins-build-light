var { ActionTypes, SLUG, DELIM } = require('../Constants');
var ApiUtil = require('../utils/ApiUtil');
var AppDispatcher = require('../AppDispatcher');

var ViewActionCreators = {
  loadBuild (url) {
    ApiUtil.loadBuild(url);
  },

  getBuildsFromUrl () {
    var slugSplit = location.href.split(SLUG);
    var host = slugSplit[0];
    var query = slugSplit[1];
    if (query) {
      var builds = query.split(DELIM);
      
      AppDispatcher.handleViewAction({
        type: ActionTypes.BUILDS_GRABBED,
        builds: builds
      });
    } else {
      AppDispatcher.handleViewAction({
        type: ActionTypes.NO_QUERY
      });
    }
  },

  addBuild (build) {
    var slugSplit = location.href.split(SLUG);
    var host = slugSplit[0];
    var query = slugSplit[1];
    if (query) {
      var builds = query.split(DELIM);
      if (builds.indexOf(build) === -1) {
        var newBuilds = builds.concat([build]);
        var newQuery = newBuilds.join(DELIM);
        location.href = (host + SLUG + newQuery);
      }
    } else {
      location.href = (host + SLUG + build);
    }
    this.getBuildsFromUrl();
  },

  removeBuild (build) {
    var slugSplit = location.href.split(SLUG);
    var host = slugSplit[0];
    var query = slugSplit[1];
    var builds = query.split(DELIM);
    var filteredBuilds = builds.filter((curr) => {
      return curr !== build;
    });

    if(filteredBuilds.length > 0) {
      var filteredQuery = filteredBuilds.join(DELIM);
      location.href = (host + SLUG + filteredQuery);
    } else {
      location.href = host;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.BUILD_REMOVED,
      build: build
    });
  }
};

module.exports = ViewActionCreators;

