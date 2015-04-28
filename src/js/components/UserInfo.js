var Reflux = require('reflux');
var React = require('react');

var UserStore = require('../stores/UserStore');
var actions = require('../actions/actions');

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

module.exports = UserInfo;