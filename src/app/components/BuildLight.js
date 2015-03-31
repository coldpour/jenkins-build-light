var React = require('react');
var BuildsStore = require('../stores/BuildsStore.js');
var ViewActionCreators = require('../actions/ViewActionCreators.js');
var { POLL_FREQUENCY } = require('../Constants.js');

var BuildLight = React.createClass({
  getInitialState () {
    return {
      loaded: false
    };
  },

  componentDidMount () {
    BuildsStore.addChangeListener(this.handleStoreChange);
    var loadThisBuild = ViewActionCreators.loadBuild.bind(this, this.props.url);
    loadThisBuild();
    window.setInterval(loadThisBuild, POLL_FREQUENCY);
  },

  componentWillUnmount () {
    BuildsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    this.setState(BuildsStore.getState().builds);
  },

  render() {
    var props = this.props;
    var color = (props.job && props.job.color) || 'grey';
    var url = props.url;
    var cls = 'light ' + color;
    return (
        <a className={ `${this.props.className} ${cls}` } href={ url }>
        <BuildText { ...props } />
        <BuildNumber { ...props } />
        <BuildDuration { ...props } />
        </a>
    );
  }
});

var BuildText = React.createClass({
  render() {
    var props = this.props;
    return (
        <div className='build-text'>
        <BuildName { ...props } />
        <BuildCulprits { ...props } />
        </div>
    );
  }
});

var BuildName = React.createClass({
  render() {
    var props = this.props;
    var displayName = (props.job && props.job.displayName) || props.url || '';
    var name = displayName.replace(/#\d*/, '');
    return (
        <div className='build-name'>{ name }</div>
    );
  }
});

var BuildCulprits = React.createClass({
  render() {
    var props = this.props;
    var culprits = (props.lastBuild && props.lastBuild.culprits) || [];
    var color = (props.job && props.job.color) || 'grey';
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

var BuildNumber = React.createClass({
  render() {
    var props = this.props;
    var number = (props.lastBuild && props.lastBuild.number) || '';
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
    var { building, estimatedDuration, duration, timestamp } = this.props.lastBuild || {};
    var timeStr = this.format(duration);

    if(building) {
      var fElapsed = this.format(Date.now() - timestamp);
      var fEstimate = this.format(estimatedDuration);
      timeStr = `${fElapsed} | ${fEstimate}`;
    }

    return <div className='light-stat build-duration'>{ timeStr }</div>;
  }
});

module.exports = BuildLight;
