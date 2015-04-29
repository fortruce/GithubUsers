var React = require('react');
var Reflux = require('reflux');

var DynamicSearchStore = require('../stores/DynamicSearchStore');
var actions = require('../actions/actions');

var DynamicSearchResults = React.createClass({
  mixins: [Reflux.connect(DynamicSearchStore)],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(t, params) {
      actions.dynamicSearch(params.endpoint, params.splat);
    }
  },
  render() {
    var results = this.state.items ? this.present() : '';
    return (
      <div>
        <h2>{this.context.router.getCurrentParams().splat}</h2>
        {results}
      </div>
    );
  },

  present() {
    switch(this.state.endpoint) {
      case 'repositories':
        return this.state.items.map((item) => {
          return (<li key={item.id}><h2>{item.name}</h2><p>{item.full_name}</p></li>);
        });
        break;
      case 'users':
        return this.state.items.map((item) => {
          return (<li key={item.id}><h2>{item.login}</h2></li>);
        });
        break;
    }
  }
});

module.exports = DynamicSearchResults;