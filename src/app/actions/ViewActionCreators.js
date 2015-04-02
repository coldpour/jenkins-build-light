var { ActionTypes, SLUG, DELIM } = require('../Constants');
var ApiUtil = require('../utils/ApiUtil');
var AppDispatcher = require('../AppDispatcher');

var ViewActionCreators = {
  loadBuild (url) {
    ApiUtil.loadBuild(url);
  },

  getBuildsFromUrl () {
    var builds = [];
    var url = location.href;
    var slugIndex = url.indexOf(SLUG);
    if (0 < slugIndex) {
      var startIndex = slugIndex + SLUG.length;
      var endIndex = url.length - 1;

      var query = url.substr(startIndex, endIndex);
      builds = query.split(DELIM);

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
    var slugIndex = location.href.indexOf(SLUG);
    if (slugIndex > 0) {
      location.href += (DELIM + build);
    } else {
      location.href += (SLUG + build);
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
    var filteredQuery = filteredBuilds.join(DELIM);
    location.href = (host + SLUG + filteredQuery);

    AppDispatcher.handleViewAction({
      type: ActionTypes.BUILD_REMOVED,
      build: build
    });
  }
};

module.exports = ViewActionCreators;

