var mongoose = require('mongoose'),
  async = require('async'),
  League = mongoose.model('League'),
  _ = require('underscore')


  exports.create = function(req, res) {
    var league = new Legue(req.body);
    league.commissioner = req.user; //express packages user object into the request as req.user
    league.save(); //Saves to database
    res.jsonp(league); //Returns league object as request response
  }

exports.show = function(req, res) {
  res.jsonp(req.league);
}

//takes a league id, finds the league, 
//and assigns it to the request object
exports.league = function(req, res, next, id) {
  var Leageue = mongoose.model('League');

  League.load(id, function(err, league) {
    if (err) return next(err);
    if (!league) return next(new Error('failed to load league' + id));
    req.league = league;
    next();
  });
}

exports.all = function(req, res) {
  League.find().populate('commissioner').exec(function(err, leagues) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(leagues);
    }
  });
}

exports.update = function(req, res) {
  var league = req.league;
  league = _.extend(league, req.body);

  league.save(function(err) {
    res.jsonp(league);
  });
}

exports.destroy = function(req, res) {
  var league = req.league;
  league.remove(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(1);
    }
  })
}