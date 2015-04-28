var React = require('react');
var { RouteHandler } = require('react-router');

var App = React.createClass({
  render() {
    return (
      <div>
        <h1 className='title blue darken-4 center-align white-text'>
          Github
        </h1>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;