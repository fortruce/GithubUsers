var React = require('react');
var Reflux = require('reflux');
var UsersStore = require('../stores/UsersStore');
var { Link } = require('react-router');
var actions = require('../actions/actions');

var UserSearchResults = React.createClass({
  mixins: [Reflux.connect(UsersStore, 'users')],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(t, params) {
      actions.searchUsers(params.search);
    }
  },
  render() {
    var users = this.state.users.map((user) => {
      return (
      <li className='col s4' key={user.login}>
        <Link to='user' params={{username: user.login}}>
          {user.login}
        </Link>
      </li>);
    });

    return (
      <ul className='row'>{users}</ul>
    );
  }
});

module.exports = UserSearchResults;