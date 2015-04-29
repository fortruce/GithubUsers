var Reflux = require('reflux');
var superagent = require('superagent');
var cache = require('../utils/cache');
var githubToken = require('../utils/apitoken');
var assign = require('object-assign');

var actions = Reflux.createActions({
  // github actions
  'getUser': {asyncResult: true},
  'searchUsers': {asyncResult: true},
  'dynamicSearch': {asyncResult: true}
});

function cacheKey(endpoint, query) {
  return endpoint + (query ? JSON.stringify(query) : '');
}

function apiRequest(action, endpoint, query, merge) {
  var key = cacheKey(endpoint, query);
  var cached = cache.get(key);
  if (cached)
    return action.completed(cached);

  return superagent.get('https://api.github.com/' + endpoint)
                   .set('Authorization', 'Basic ' + btoa(githubToken + ':'))
                   .query(query)
                   .send()
                   .end((err, res) => {
                      if (err) return action.failed(err);
                      if (merge) {
                        var merged = assign(res.body, merge)
                      }
                      action.completed(cache.set(key, merged || res.body));
                   });
}

actions.getUser.listen( function (username) {
  apiRequest(this, 'users/' + username);
});

actions.searchUsers.listen( function (username) {
  apiRequest(this, 'search/users', {q: username});
});

actions.dynamicSearch.listen( function (searchEndpoint, search) {
  var endpoint = 'search/' + searchEndpoint;
  apiRequest(this, endpoint, {q: search}, {endpoint: searchEndpoint});
});

module.exports = actions;