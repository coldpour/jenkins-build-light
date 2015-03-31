var React = require('react');
var Header = require('./Header');
var LightGrid = require('./LightGrid');

var App = React.createClass({
  render () {
    return (
        <div className='app'>
        <Header />
        <LightGrid />
        </div>
    );
  }
});

module.exports = App;

