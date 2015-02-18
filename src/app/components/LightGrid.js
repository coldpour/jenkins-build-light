var React = require('react');
var BuildLight = require('./BuildLight');
var BUILDS = require('../Constants.js').BUILDS;

var LightGrid = React.createClass({
  propTypes: {
    loaded: React.PropTypes.bool,
    builds: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render() {
    var cls = this._getLightSize(BUILDS.length);

    var builds = this.props.builds.map((build) => {
      return (
        <div className={ cls }>
          <BuildLight key={ build.lastBuild.id } { ...build }/>
        </div>
      );
    });

    return (
        <div>
        { this.props.loaded ? builds : 'Loading...' }
        </div>
    );
  },

  _getLightSize(num) {
    if(num < 4) {
      return '';
    } else if(num <= 9) {
      return 'twoColumn';
    } else if (num <= 12) {
      return 'threeColumn';
    } else {
      return 'fourColumn';
    }
  }
});

module.exports = LightGrid;
