var React = require('react');
var { RouteHandler } = require('react-router');

var DynamicSearch = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    // Only allow one of the Github Api Endpoints
    willTransitionTo(t, params) {
      if (['repositories', 'code', 'issues', 'users']
          .indexOf(params.endpoint) === -1)
        t.redirect('/');
    }
  },
  render() {
    return (
      <div>
      <h1>{this.context.router.getCurrentParams().endpoint}</h1>
      <RouteHandler />
      </div>
    );
  }
});

module.exports = DynamicSearch;