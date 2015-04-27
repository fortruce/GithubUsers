var Reflux = require('reflux');
var actions = require('../actions/actions');

var UsersStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return [];
  },

  onSearchUsers() {
    this.trigger([]);
  },

  onSearchUsersCompleted(users) {
    this.trigger(users.items);
  }
});

module.exports = UsersStore;