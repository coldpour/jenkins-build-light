var React = require('react');
var BuildsStore = require('../stores/BuildsStore.js');
var ViewActionCreators = require('../actions/ViewActionCreators.js');
var BuildLight = require('./BuildLight');

var LightGrid = React.createClass({
  getInitialState () {
    return BuildsStore.getState();
  },

  componentDidMount () {
    BuildsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.getBuildsFromUrl();
  },

  componentWillUnmount () {
    BuildsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    this.setState(BuildsStore.getState());
  },

  render() {
    var builds = this.state.builds;
    var keys = Object.keys(builds);
    var numBuilds = keys.length;
    var cls = this._getLightSize(numBuilds);
    var buildLights = [];

    if(numBuilds > 0) {
      buildLights = keys.map((id) => {
        return <BuildLight key={ id } className={ cls } { ...builds[id] } />;
      });
    }

    return (
        <div className={ `light-grid` }>
        { buildLights }
      </div>
    );      
  },

  _getLightSize(num) {
    if(!num || num < 9) {
      return 'twoColumn';
    } else if (num < 16) {
      return 'threeColumn';
    } else {
      return 'fourColumn';
    }
  }
});

module.exports = LightGrid;
