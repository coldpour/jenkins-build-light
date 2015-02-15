var React = require('react');
require('./styles.css');
var xhr = require('./lib/xhr');

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
        <a className={ cls } href={props.url}>{ props.name }</a>
    );
  }
});

var LightGrid = React.createClass({
  render() {
    var builds = this.props.builds.map((build) => {
      return <BuildLight key={build.name} { ...build }/>;
    });

    return (
        <div className='list'>
        { this.props.loaded ? builds : 'Loading...' }
        </div>
    );
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      builds: [],
      loaded: false
    };
  },

  loadBuilds () {
    var url = 'http://localhost:9090/q=churro.ci.f4tech.com/job/churro&http://almci/job/alm-jobs/job/alm/&http://almci/job/app-catalog-jobs/job/app-catalog/&http://almci/job/appsdk-jobs/job/appsdk/&http://almci/job/alm-jobs/job/alm-backward-compatibility-of-migrations/&http://almci/job/bridge/job/appsdk-alm-bridge/';

    xhr.getJSON(url, (err, res) => {
      if(err) throw err;
      console.log('res', res);
      this.setState({
        builds: res,
        loaded: true
      });
    });
  },

  componentDidMount() {
    this.loadBuilds();
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

React.render(<App/>, document.body);
