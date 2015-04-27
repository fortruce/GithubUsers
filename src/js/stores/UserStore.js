var Reflux = require('reflux');
var actions = require('../actions/actions');

var UserStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return {};
  },

  onGetUser() {
    this.trigger({});
  },

  onGetUserCompleted(user) {
    this.trigger(user);
  }
});

module.exports = UserStore;