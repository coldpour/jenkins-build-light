var React = require('react');

var BuildLight = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    color: React.PropTypes.string
  },

  render() {
    var props = this.props;
    var cls = "light link " + props.color || "grey";
    return (
        <a className={ cls } href={props.url}>
        <div className='light-name'>{ props.name }</div>
        <div className='light-stat'>#{ props.lastBuild.number }</div>
        </a>
    );
  }
});

module.exports = BuildLight;
