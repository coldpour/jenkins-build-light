var keyMirror = require('react/lib/keyMirror');

module.exports = {
  POLL_FREQUENCY: 5000,
  SLUG: '#',
  DELIM: '&',

  ActionTypes: keyMirror({
    BUILDS_GRABBED: null,
    BUILD_ADDED: null,
    BUILD_LOADED: null,
    BUILD_REMOVED: null,
    NO_QUERY: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
