require('babel/polyfill');

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, DefaultRoute, Link } = require('react-router');

var Search = require('./components/Search');
var App = require('./components/App');
var UserInfo = require('./components/UserInfo');
var UserSearchResults = require('./components/UserSearchResults');
var DynamicSearch = require('./components/DynamicSearch');
var DynamicSearchResults = require('./components/DynamicSearchResults');


var routes = (
  <Route handler={App}>
    <Route name='search' path='/' handler={Search}>
      <Route  name='searchResults'
              path='search/:search'
              handler={UserSearchResults} />
    </Route>
    <Route name='user' path='user/:username' handler={UserInfo} />
    <Route name='dynamic' path='dyn/:endpoint' handler={DynamicSearch}>
      <Route  name='dynamicResults'
              path='search/*'
              handler={DynamicSearchResults} />
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});