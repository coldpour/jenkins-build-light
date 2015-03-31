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
    var textCls = `${this.state.collapsed ? 'collapsed' : ' expanded'}-add-text`;
    return (
        <div className='add-build-form'>
        { !this.state.collapsed ? <input type='text' tabIndex='1' className={ textCls } ref='addText' placeholder='job url' onKeyDown={ this.keyDown } onKeyPress={ this.keyPress } /> : null }
        <button className={ btnCls } ref='addBtn' onClick={ this.state.collapsed ? this.expand : this.submit }>+</button>
        </div>
    );
  },

  keyDown (e) {
    if('Enter' === e.key) {
      this.submit();
    } else if('Escape' === e.key) {
      this.collapse();
    } else {
      console.log('keyDown:', e.key);
    }
    e.stopPropagation();
  },

  keyPress (e) {
    console.log('form keyPress:', e.key);
    e.stopPropagation();
  },

  expand () {
    console.log('form expanding');
    this.setState({
      collapsed: false
    }, () => {
      this.refs.addText.getDOMNode().focus();
    });
  },

  collapse () {
    console.log('form collapsing');
    this.setState({
      collapsed: true
    });
  },

  submit () {
    console.log('form submit');
    var text = this.refs.addText.getDOMNode().value;
    if(text) {
      this.collapse();
      ViewActionCreators.addBuild(text);
    }
  }
});

module.exports = AddBuildForm;
