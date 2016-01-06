var xhr = require('../lib/xhr');
var { PROXY, PROXY_PORT } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var ApiUtils = {
  loadBuild (build) {
    if(build) {
      var url = `/q/${build}`;

      xhr.getJSON(url, (err, res) => {
        ServerActionCreators.loadedBuild(res);
      });
    }
  }
};

module.exports = ApiUtils;
