var { ActionTypes } = require('../Constants');
var ApiUtil = require('../utils/ApiUtil');

var ViewActionCreators = {
  loadBuilds () {
    ApiUtil.loadBuilds();
  }
};

module.exports = ViewActionCreators;

