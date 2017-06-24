
let app = angular.module('gamerank-ng', ['ngRoute']);

app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider
    .when('/games', { templateUrl: 'partials/master', controller: 'master' })
    .when('/game/:id', { templateUrl: 'partials/detail', controller: 'detail' })
    .otherwise({ redirectTo: '/games' });
}]);

app.controller('master', function ($scope, gamerankservice) {
  $scope.games = [];

  $scope.search = (query) => {
    gamerankservice.search(query)
      .then((response) => {
        $scope.games = response.data.results;
        console.log('success', response);
      }, (response) => {
        console.log('error', response)
      });
  }
});

app.controller('detail', function ($scope, $routeParams, gamerankservice) {
  $scope.id = $routeParams.id;
  $scope.game = {};

  gamerankservice.game($scope.id)
    .then((response) => {
      $scope.game = response.data;
      console.log('success', response);
    }, (response) => {
      console.log('error', response)
    });
});

app.factory('gamerankservice', ($http) => {
  let gamerankdata = {};

  gamerankdata.search = (q = 'pokemon') => $http({
    method: 'GET',
    url: '/games/search?q=' + q
  });

  gamerankdata.game = (id = 4725) => $http({
    method: 'GET',
    url: '/games/' + id
  });

  return gamerankdata;
});
