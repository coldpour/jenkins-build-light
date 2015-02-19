var keyMirror = require('react/lib/keyMirror');

module.exports = {
  PROXY_PORT: 9090,
  PROXY: 'http://mholm-mbp.f4tech.com',
  POLL_FREQUENCY: 5000,

  BUILDS: [
    'urro.ci.f4tech.com/job/sombrero',
    'urro.ci.f4tech.com/job/burro-build',
    'urro.ci.f4tech.com/job/churro',
    'urro.ci.f4tech.com/job/churro-errors',
    'urro.ci.f4tech.com/job/ux-bootstrap',
    'almci/job/alm-jobs/job/alm',
    'almci/job/app-catalog-jobs/job/app-catalog',
    'almci/job/appsdk-jobs/job/appsdk',
    'almci/job/bridge/job/appsdk-alm-bridge',
    'almci/job/alm-jobs/job/alm-backward-compatibility-of-migrations'
  ],

  ActionTypes: keyMirror({
    BUILDS_LOADED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};

