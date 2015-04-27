var Reflux = require('reflux');
var superagent = require('superagent');

var actions = Reflux.createActions({
  // github actions
  'getUser': {asyncResult: true},
  'searchUsers': {asyncResult: true}
});

actions.getUser.listen( function (username) {
  superagent.get('https://api.github.com/users/' + username)
        .send()
        .end((err, res) => {
          if (err) return actions.getUser.failed(err);
          return actions.getUser.completed(res.body);
        });
});

actions.searchUsers.listen( function (username) {
  superagent.get('https://api.github.com/search/users')
            .query({q: username})
            .send()
            .end((err, res) => {
              if (err) return actions.searchUsers.failed(err);
              return actions.searchUsers.completed(res.body);
            });
});

module.exports = actions;