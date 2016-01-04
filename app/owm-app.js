'use strict';

angular.module('OWMApp', ['ngRoute'])
  .run([
    '$rootScope', '$location',
    function ($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function () {
        $location.path('/error');
      });
    }])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        })
        .when('/error', {
          templateUrl: 'error.html'
        })
        .when('/cities/:city', {
          templateUrl: 'city.html',
          controller: 'CityCtrl',
          resolve: {
            city: [
              'owmCities', '$route', '$location',
              function (owmCities, $route, $location) {
                var city = $route.current.params.city;
                if (owmCities.indexOf(city) === -1) {
                  // city not found
                  $location.path('/error');
                  return;
                }
                return city;
              }
            ]
          }
        })
        .otherwise('/error');
    }])
  .value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .controller('HomeCtrl', [
    '$scope',
    function ($scope) {
      // empty
    }])
  .controller('CityCtrl', [
    '$scope', 'city',
    function ($scope, city) {
      $scope.city = city;
    }]);
