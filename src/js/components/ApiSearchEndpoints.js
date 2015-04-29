var React = require('react');
var { Endpoints } = require('../utils/constants');
var { Link } = require('react-router');

var ApiSearchEndpoints = React.createClass({
  render() {
    var endpoints = Endpoints.map((endpoint) => {
      return(
        <Link className='collection-item'
              to='dynamic'
              params={{endpoint: endpoint}}>
          {endpoint}
        </Link>
      );
    });
    return (
      <div className='collection'>
        {endpoints}
      </div>
    );
  }
});

module.exports = ApiSearchEndpoints;