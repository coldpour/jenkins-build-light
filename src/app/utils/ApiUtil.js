var xhr = require('../lib/xhr');
var { BUILDS, PROXY, PROXY_PORT } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var ApiUtils = {
  loadBuilds () {
    var url = BUILDS.reduce(
      (prev, curr, i, arr) => {
        var seperator = i>0?'&':'';
        return prev + seperator + curr;
      }, 
      `${PROXY}:${PROXY_PORT}/q=`);

    xhr.getJSON(url, (err, res) => {
      ServerActionCreators.loadedBuilds(res);
    });
  }
};

module.exports = ApiUtils;
