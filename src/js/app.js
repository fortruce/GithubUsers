require('babel/polyfill');

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, DefaultRoute, Link } = require('react-router');
var Reflux = require('reflux');

var actions = require('./actions/actions');
var UserStore = require('./stores/UserStore');
var UsersStore = require('./stores/UsersStore');

var App = React.createClass({
  render() {
    return (
      <div>
        <h1 className='title teal center-align white-text'>Github</h1>
        <RouteHandler />
      </div>
    );
  }
});

var UserInfo = React.createClass({
  mixins: [Reflux.connect(UserStore)],
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount() {
    actions.getUser(this.context.router.getCurrentParams().username);
  },

  // handle react-router url changes
  componentWillReceiveProps() {
    actions.getUser(this.context.router.getCurrentParams().username);
  },

  render() {
    return (
      <div>
      <h2>{this.context.router.getCurrentParams().username}</h2>
        {this.state.login}
      </div>
    );
  }
});

var UserSearchResults = React.createClass({
  mixins: [Reflux.connect(UsersStore, 'users')],
  render() {
    console.log('users:', this.state.users);
    var users = this.state.users.map((user) => {
      return (
      <li className='col s4'>
        <Link to='user' params={{username: user.login}}>{user.login}</Link>
      </li>);
    });

    return (
      <ul className='row'>{users}</ul>
    );
  }
});

var Search = React.createClass({
  search(e) {
    e.preventDefault();
    actions.searchUsers(this.refs.username.getDOMNode().value.trim());
  },
  render() {
    return (
      <form className='row' onSubmit={this.search}>
        <input  className='col s8 offset-s2 input-field center-align'
                type='text'
                placeholder='Search for Users'
                ref='username' />
        <UserSearchResults />
      </form>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name='search' path='/' handler={Search} />
    <Route name='user' path='user/:username' handler={UserInfo} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});