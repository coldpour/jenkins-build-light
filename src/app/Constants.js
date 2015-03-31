var keyMirror = require('react/lib/keyMirror');

module.exports = {
  PROXY_PORT: 9090,
  PROXY: 'http://localhost',
  POLL_FREQUENCY: 5000,
  SLUG: '#',
  DELIM: '&',

  ActionTypes: keyMirror({
    BUILDS_GRABBED: null,
    BUILD_LOADED: null,
    NO_QUERY: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};

