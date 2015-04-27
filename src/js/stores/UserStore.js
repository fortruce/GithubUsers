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
    console.log(user);
    this.trigger(user);
  }
});

module.exports = UserStore;