var React = require('react');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddBuildForm = React.createClass({
  getInitialState () {
    return {
      collapsed: true
    };
  },

  render () {
    var btnName = 'addBtn';
    var btnCls = 'add-btn';
    var textCls = 'add-text add-text--' + (this.state.collapsed ? 'collapsed' : 'expanded');
    return (
        <div className='add-build-form'>
        <input type='text' className={ textCls } ref='addText' placeholder='job url' onKeyDown={ this.keyDown } onKeyPress={ this.keyPress } />
        <button className={ btnCls } tabIndex='1' ref='addBtn' onClick={ this.state.collapsed ? this.expand : this.submit }>+</button>
        </div>
    );
  },

  keyDown (e) {
    if('Enter' === e.key) {
      this.submit();
    } else if('Escape' === e.key) {
      this.collapse();
    }
    e.stopPropagation();
  },

  keyPress (e) {
    e.stopPropagation();
  },

  expand () {
    this.setState({
      collapsed: false
    }, () => {
      this.refs.addText.getDOMNode().focus();
    });
  },

  collapse () {
    this.setState({
      collapsed: true
    });
  },

  submit () {
    var text = this.refs.addText.getDOMNode().value;
    if(text) {
      this.collapse();
      ViewActionCreators.addBuild(text);
      this.refs.addText.getDOMNode().value = '';
    }
  }
});

module.exports = AddBuildForm;
