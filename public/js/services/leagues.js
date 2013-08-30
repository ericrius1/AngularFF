window.angular.module('ngff.services.leagues', [])
  .factory('Leagues', ['$resource',
    function($resource){
      return $resource(
        //Set the parameterized resource url
          'leagues/:leaguesId',
          {
            //@ parameter in paramsDefault attempts to 
            //extract a leagueId from the resource object provided to it
            leagueId: '@_id'
          },
          {
            update: {method: 'PUT'}
          }
        )
    }]);