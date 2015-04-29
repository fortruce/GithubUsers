var React = require('react');
var { RouteHandler } = require('react-router');
var ApiSearchEndpoints = require('../components/ApiSearchEndpoints');

var App = React.createClass({
  render() {
    return (
      <div>
        <h1 className='title blue darken-4 center-align white-text'>
          Github
        </h1>
        <div className='row'>
          <div className='col s3'>
            <ApiSearchEndpoints />
          </div>
          <div className='col s9'>
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;