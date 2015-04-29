var React = require('react');
var { RouteHandler, State } = require('react-router');
var Reflux = require('reflux');
var { Endpoints } = require('../utils/constants');
var actions = require('../actions/actions');
var DynamicSearchStore = require('../stores/DynamicSearchStore');

var DynamicSearch = React.createClass({
  mixins: [ State ],
  getInitialState() {
    return {search: this.getParams().splat || ''};
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    // Only allow one of the Github Api Endpoints
    willTransitionTo(t, params) {
      if (Endpoints.indexOf(params.endpoint) === -1)
        t.redirect('/');
    }
  },
  componentWillReceiveProps() {
    this.setState({search: this.getParams().splat || ''});
  },
  render() {
    return (
      <div className='container'>
        <form className='row' onSubmit={this.search}>
          <input  className='col s8 offset-s2 input-field center-align'
                  type='text'
                  placeholder={'Search for ' + this.getParams().endpoint}
                  value={this.state.search}
                  onChange={this.onChange}
                  ref='search' />
        </form>
        <RouteHandler />
      </div>
    );
  },
  onChange(e) {
    this.setState({search: e.target.value});
  },
  search(e) {
    e.preventDefault();
    var search = this.refs.search.getDOMNode().value;
    this.context.router.transitionTo('dynamicResults', {
      endpoint: this.getParams().endpoint,
      splat: search
    });
  }
});

module.exports = DynamicSearch;