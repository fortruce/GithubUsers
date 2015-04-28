var Reflux = require('reflux');
var actions = require('../actions/actions');

var SearchStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return '';
  },
  onSearchUsers(search) {
    this.trigger(search);
  }
});

module.exports = SearchStore;