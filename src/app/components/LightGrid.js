var React = require('react');
var BuildLight = require('./BuildLight');

var LightGrid = React.createClass({
  propTypes: {
    loaded: React.PropTypes.bool,
    builds: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render() {
    var builds = this.props.builds.map((build) => {
      return <BuildLight key={build.name} { ...build }/>;
    });

    return (
        <div className='list'>
        { this.props.loaded ? builds : 'Loading...' }
        </div>
    );
  }
});

module.exports = LightGrid;
