
var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  
  app.param('userId', users.user)

  var leagues = require('../app/controllers/leagues');
  app.get('/leagues', leagues.all)
  app.post('/leagues', auth.requiresLogin, leagues.create);
  app.get('leagues/:leagueId', leagues.show);
  //The methods following the route string are chained and invoked serially
  app.put('/leagues/:leagueId', auth.requiresLogin, leagues.update);
  app.del('/leagues/:leagueId', auth.requiresLogin, leagues.destroy);

//This makes it possible for the league controller routes to access
//the league object directly from the request object with req.league
  app.param('leagueId', leagues.league);
  
  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
