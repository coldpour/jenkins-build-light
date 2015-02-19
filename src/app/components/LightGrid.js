var React = require('react');
var BuildLight = require('./BuildLight');

var LightGrid = React.createClass({
  propTypes: {
    loaded: React.PropTypes.bool,
    builds: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render() {
    var cls = this._getLightSize(this.props.builds.length);

    var builds = this.props.builds.reduce((prev, curr, i, arr) => {
      return prev.concat([
          <BuildLight key={ curr.displayName } className={ cls } { ...curr }/>
      ]);
    }, []);

    return (
        <div className={ `light-grid` }>
        { this.props.loaded ? builds : 'Loading...' }
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
