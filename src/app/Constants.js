var keyMirror = require('react/lib/keyMirror');

module.exports = {
  PROXY: 'http://localhost:9090',
  POLL_FREQUENCY: 5000,

  BUILDS: [
    'http://urro.ci.f4tech.com/job/burro-build/',
    'churro.ci.f4tech.com/job/churro',
    'http://urro.ci.f4tech.com/view/%20Build%20Light%20View/job/churro-errors/',
    'http://urro.ci.f4tech.com/job/ux-bootstrap/',
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

