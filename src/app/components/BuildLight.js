var React = require('react');

var BuildLight = React.createClass({
  propTypes: {
    fullDisplayName: React.PropTypes.string,
    url: React.PropTypes.string,
    result: React.PropTypes.string,
    number: React.PropTypes.number,
    duration: React.PropTypes.number
  },

  render() {
    var props = this.props;
    var name = this._extractName(props.fullDisplayName);
    var duration = this._createDurationString();
    var cls = "light link " + this._parseColor(props.result);
    return (
        <a className={ cls } href={props.url}>
        <div className='light-name'>{ name }</div>
        <div className='light-stat number'>#{ props.number }</div>
        <div className='light-stat duration'>{ duration }ms</div>
        </a>
    );
  },

  _extractName(str) {
    return str.replace(/#\d*/, '');
  },

  _parseColor(result) {
    switch (result) {
      case 'SUCCESS':
        return 'blue';
      case 'FAILURE':
        return 'red';
      default:
        return 'grey';
    }
  },

  _createDurationString() {
    var props = this.props;
    return props.building ? props.estimatedDuration : props.duration;
  }
});

module.exports = BuildLight;
