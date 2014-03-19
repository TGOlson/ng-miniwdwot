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
        templateUrl: '../assets/organizations.html',
        controller: 'OrgsCtrl'
      })
      .when('/organizations/:id', {
        templateUrl: '../assets/organization.html',
        controller: 'OrgCtrl'
      })
      .otherwise({
        templateUrl: '../assets/orgs.html',
        controller: 'OrgsCtrl'
      });
      // .otherwise({
      //   redirectTo: '/'
      // });
  }]);


// Miniwdwot.config(['$routeProvider', ($routeProvider) ->
//   // # Route for '/post'
//   $routeProvider.when('/post', { templateUrl: '../assets/mainPost.html', controller: 'PostCtrl' } )

//   // # Default
//   $routeProvider.otherwise({ templateUrl: '../assets/mainIndex.html', controller: 'IndexCtrl' } )

// ])