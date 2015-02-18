var React = require('react');

var BuildLight = React.createClass({
  render() {
    var props = this.props;
    var { color, url } = props.job;
    var cls = 'light ' + color || 'grey';
    return (
        <a className={ cls } href={ url }>
        <BuildName { ...props } />
        <BuildNumber { ...props } />
        <BuildDuration { ...props } />
        <BuildCulprits { ...props } />
        </a>
    );
  }
});

var BuildName = React.createClass({
  render() {
    var { displayName } = this.props.job;
    var name = displayName.replace(/#\d*/, '');
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
    var { building, estimatedDuration, duration, timestamp } = this.props.lastBuild;
    var timeStr = this.format(duration);

    if(building) {
      var fElapsed = this.format(Date.now() - timestamp);
      var fEstimate = this.format(estimatedDuration);
      timeStr = `${fElapsed} | ${fEstimate}`;
    }

    return <div className='light-stat build-duration'>{ timeStr }</div>;
  }
});

var BuildCulprits = React.createClass({

  render() {
    var { culprits } = this.props.lastBuild;
    var { color } = this.props.job;
    var list = culprits.reduce((prev, curr, i) => {
      var seperator = i > 0 ? ', ' : '';
      return prev + seperator + curr.fullName;
    }, 'Potential Culprits: ');
    var failed = color === 'red' || color === 'red_anime' ;
    var culpritsStr = failed ? list : '';
    var cls = 'build-culprits' + (!failed ? ' hidden' : '');
    return <div className={ cls }>{ culpritsStr }</div>;
  }
});

module.exports = BuildLight;
