var Reflux = require('reflux');
var superagent = require('superagent');
var cache = require('../utils/cache');

var githubToken = 'inserttokenhere:';

var actions = Reflux.createActions({
  // github actions
  'getUser': {asyncResult: true},
  'searchUsers': {asyncResult: true}
});

function apiRequest(action, endpoint, query) {
  var key = endpoint + (query ? JSON.stringify(query) : '');
  var cached = cache.get(key);
  if (cached)
    return this.completed(cached);

  return superagent.get('https://api.github.com/' + endpoint)
                   .set('Authorization', 'Basic ' + btoa(githubToken))
                   .query(query)
                   .send()
                   .end((err, res) => {
                      if (err) return action.failed(err);
                      action.completed(cache.set(res.body));
                   });
}

actions.getUser.listen( function (username) {
  apiRequest(this, 'users/' + username);
});

actions.searchUsers.listen( function (username) {
  apiRequest(this, 'search/users', {q: username});
});

module.exports = actions;