var keyMirror = require('react/lib/keyMirror');

module.exports = {
  PROXY_PORT: 9090,
  POLL_FREQUENCY: 5000,

  BUILDS: [
    'churro.ci.f4tech.com/job/churro',
    'almci/job/alm-jobs/job/alm',
    'almci/job/app-catalog-jobs/job/app-catalog',
    'almci/job/appsdk-jobs/job/appsdk',
    'almci/job/alm-jobs/job/alm-backward-compatibility-of-migrations',
    'almci/job/bridge/job/appsdk-alm-bridge'
  ],

  ActionTypes: keyMirror({
    BUILDS_LOADED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};

