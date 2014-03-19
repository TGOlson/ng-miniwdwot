'use strict';

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/assets/organization/index.html',
        controller: 'ViewCtrl'
      })
      .when('/properties', {
        templateUrl: '/assets/organization/properties.html',
        controller: 'ViewCtrl'
      })
      .when('/featured_properties', {
        templateUrl: '/assets/organization/featured_properties.html',
        controller: 'ViewCtrl'
      })
      .when('/about', {
        templateUrl: '/assets/organization/about.html',
        controller: 'ViewCtrl'
      })
      // .otherwise({
      //   redirectTo: '/organizations'
      // });
  }]);
