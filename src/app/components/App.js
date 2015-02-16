var React = require('react');
var BuildsStore = require('../stores/BuildsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');
var LightGrid = require('./LightGrid');

var App = React.createClass({
  getInitialState () {
    return BuildsStore.getState();
  },

  componentDidMount () {
    BuildsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.loadBuilds();
  },

  componentWillUnmount () {
    BuildsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    this.setState(BuildsStore.getState());
  },

  renderBuilds () {
    return this.state.contacts.map((contact) => {
      return <li>{contact.first} {contact.last}</li>;
    });
  },

  render () {
    return (
        <div>
        <h1>Jenkins Build Light View</h1>
        <LightGrid { ...this.state }/>
        </div>
    );
  }
});

module.exports = App;

