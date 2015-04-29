var Reflux = require('reflux');

var actions = require('../actions/actions');

var DynamicSearchStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return {items: []};
  },
  onDynamicSearch() {
    this.trigger(this.getInitialState());
  },
  onDynamicSearchCompleted(res) {
    this.trigger(res);
  }
});

module.exports = DynamicSearchStore;