'use strict';

// var miniwdwot = angular.module('miniwdwot', [
//   // 'ngCookies',
//   // 'ngSanitize',
//   'ngRoute'
// ])

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/organizations', {
        templateUrl: '/assets/organizations/index.html',
        controller: 'OrganizationsCtrl'
      })
      .when('/organizations/:id', {
        templateUrl: '/assets/organizations/show.html',
        controller: 'OrganizationCtrl'
      })
      .when('/organizations/:id/properties', {
        templateUrl: '/assets/organizations/properties.html',
        controller: 'OrganizationCtrl'
      })
      .when('/organizations/:id/featured_properties', {
        templateUrl: '/assets/organizations/featured_properties.html',
        controller: 'OrganizationCtrl'
      })
      .when('/organizations/:id/about', {
        templateUrl: '/assets/organizations/about.html',
        controller: 'OrganizationCtrl'
      })
      .otherwise({
        redirectTo: '/organizations'
      });
  }]);


// Miniwdwot.config(['$routeProvider', ($routeProvider) ->
//   // # Route for '/post'
//   $routeProvider.when('/post', { templateUrl: '../assets/mainPost.html', controller: 'PostCtrl' } )

//   // # Default
//   $routeProvider.otherwise({ templateUrl: '../assets/mainIndex.html', controller: 'IndexCtrl' } )

// ])