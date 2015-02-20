var React = require('react');
var BuildLight = require('./BuildLight');

var LightGrid = React.createClass({
  propTypes: {
    loaded: React.PropTypes.bool,
    builds: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render() {
    var props = this.props;
    var builds = props.builds;
    var cls = this._getLightSize(builds.length);
    console.log(builds.length, 'builds');
    console.log('LightGrid > cls', cls);

    var buildLights = builds.reduce((prev, curr, i, arr) => {
      return prev.concat([
          <BuildLight key={ curr.displayName } className={ cls } { ...curr }/>
      ]);
    }, []);

    return (
        <div className={ `light-grid` }>
        { props.loaded ? buildLights : 'Loading...' }
        </div>
    );
  },

  _getLightSize(num) {
    if(num < 9) {
      return 'twoColumn';
    } else if (num < 16) {
      return 'threeColumn';
    } else {
      return 'fourColumn';
    }
  }
});

module.exports = LightGrid;
