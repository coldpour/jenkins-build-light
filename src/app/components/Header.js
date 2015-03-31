var React = require('react');
var AddBuildForm = require('./AddBuildForm');

var Header = React.createClass({
  render () {
    return (
      <div className='header'>
        <h1>
        Jenkins Build Light View
        <AddBuildForm />
        </h1>
      </div>
    );
  }
});

module.exports = Header;
