var React = require('react');
var { RouteHandler } = require('react-router');
var UserSearchResults = require('../components/UserSearchResults');

var actions = require('../actions/actions');
var SearchStore = require('../stores/SearchStore');
var Reflux = require('reflux');

var Search = React.createClass({  
  mixins: [Reflux.connect(SearchStore, 'search')],
  contextTypes: {
    router: React.PropTypes.func
  },
  search(e) {
    e.preventDefault();
    this.context.router.transitionTo('searchResults', {
      search: this.refs.username.getDOMNode().value.trim()
    });
  },
  onChange() {
    this.setState({search: this.refs.username.getDOMNode().value});
  },
  render() {
    return (
      <form className='row' onSubmit={this.search}>
        <input  className='col s8 offset-s2 input-field center-align'
                type='text'
                placeholder='Search for Users'
                value={this.state.search}
                onChange={this.onChange}
                ref='username' />
        <RouteHandler />
      </form>
    );
  }
});

module.exports = Search;