window.angular.module('ngff.controllers.leagues', [])
  .controller('LeaguesController', ['$scope', '$routeParams', '$location', 'Global', 'Leagues',
    function ($scope, $routeParams, $location, Global, Leagues) {
      $scope.Global = Global;

      $scope.create = function() {
        var league = new Leagues({
          //Created from form data
          name: this.league.name
        });
        league.$save(function(response) {
          //The save callback uses the $location service
          //to navigate to the individual league page for the new league
          $location.path("leagues/" + response._id);
        });
        //clear existing form data
        this.league.name = "";
      }

      $scope.find = function(query) {
        Leagues.query(query, function(leagues) {
          $scope.leagues = leagues;
        });
      };

      $scope.findOne = function() {
        Leagues.get({
          leagueId: $routeParams.leagueId
        }, function(league) {
          $scope.league = league;
        });
      }

      $scope.update = function() {
        var league = $scope.league;
        league.$update(function() {
          $location.path('leagues/' + league._id);
        });
      }

      $scope.remove = function (league){
        league.$remove(); //removes on backend
        for (var i in $scope.leagues){
          if ($scope.leagues[i] == league) {
            $scope.leagues.splice(i, 1);
          }
        }
      }


    }])