(() => {
  var Constants = require('./src/app/Constants');
  var PROXY = Constants.PROXY;
  var PROXY_PORT = Constants.PROXY_PORT;
  var express = require('express');
  var jenkins = require('./src/middleware/jenkins');
  var logger = require('./src/middleware/logger');

  var app = express();
  app.use(logger);
  app.use(jenkins);
  app.use(express.static(__dirname + '/public'));

  app.listen(PROXY_PORT, () => {
    console.log('Server listening on '+PROXY+':'+PROXY_PORT+'/');
  });
})();
