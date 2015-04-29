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
    // Transitions are triggered thru either the search input
    // or url traversing - trigger action here for both
    willTransitionTo(t, params) {
      actions.searchUsers(params.search);
    }
  },
  render() {
    var users = this.state.users.map((user) => {
      return (
        <Link to='user'
              className='collection-item'
              key={user.login}
              params={{username: user.login}}>
          {user.login}
        </Link>);
    });

    return (
      <div className='row'>
        <div className='col s6 offset-s3'>
        <ul className='collection'>{users}</ul>
        </div>
      </div>
    );
  }
});

module.exports = UserSearchResults;