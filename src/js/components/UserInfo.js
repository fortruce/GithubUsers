var Reflux = require('reflux');
var React = require('react');

var UserStore = require('../stores/UserStore');
var actions = require('../actions/actions');

var UserInfo = React.createClass({
  mixins: [Reflux.connect(UserStore)],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(t, params) {
      actions.getUser(params.username);
    }
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

module.exports = UserInfo;