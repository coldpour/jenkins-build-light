var React = require('react');

var BuildLight = React.createClass({
  render() {
    var props = this.props;
    var { color, url } = props.job;
    var cls = 'light link ' + color || 'grey';
    return (
        <a className={ cls } href={ url }>
        <BuildName { ...props } />
        <BuildNumber { ...props } />
        <BuildDuration { ...props } />
        </a>
    );
  }
});

var BuildName = React.createClass({
  render() {
    var { fullDisplayName } = this.props.lastBuild;
    var name = fullDisplayName.replace(/#\d*/, '');
    return <div className='build-name'>{ name }</div>;
  }
});

var BuildNumber = React.createClass({
  render() {
    var { number } = this.props.lastBuild;
    var str = number ? `#${number}` : '';
    return <div className='light-stat build-number'>{ str }</div>;
  }
});

var BuildDuration = React.createClass({
  format(ms) {
    var x = ms / 1000;
    var seconds = Math.floor(x % 60);
    x /= 60;
    var minutes = Math.floor(x % 60);
    x /= 60;
    var hours = Math.floor(x % 24);
    var str = hours > 0 ? `${hours}h` : '';
    str += minutes > 0 ? ` ${minutes}m` : '';
    str += seconds > 0 ? ` ${seconds}s` : '';
    return str;
  },

  render() {
    var { building, estimatedDuration, duration } = this.props.lastBuild;
    var time = building ? estimatedDuration : duration;    
    return <div className='light-stat build-duration'>{ this.format(time) }</div>;
  }
});

module.exports = BuildLight;
