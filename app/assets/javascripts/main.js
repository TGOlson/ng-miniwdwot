'use strict';


// Blog.config(["$httpProvider", (provider) ->
//   provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
// ])

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute'
  ]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/organization/index.html',
      controller: 'OrgContentCtrl'
    })
    .when('/properties', {
      templateUrl: '/assets/organization/properties.html',
      controller: 'OrgContentCtrl'
    })
    .when('/featured_properties', {
      templateUrl: '/assets/organization/featured_properties.html',
      controller: 'OrgContentCtrl'
    })
    .when('/about', {
      templateUrl: '/assets/organization/about.html',
      controller: 'OrgContentCtrl'
    })
    .when('/edit', {
      templateUrl: '/assets/organization/edit.html',
      controller: 'OrgContentCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

}]);
