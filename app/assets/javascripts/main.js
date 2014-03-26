'use strict';

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute',
    'templates'
  ]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/organizations/index.html',
      controller: 'OrganizationsCtrl'
    })
    .when('/:id', {
      templateUrl: '/assets/organization/index.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/properties', {
      templateUrl: '/assets/organization/properties.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/featured', {
      templateUrl: '/assets/organization/featured.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/about', {
      templateUrl: '/assets/organization/about.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/edit', {
      templateUrl: '/assets/organization/edit.html',
      controller: 'OrganizationCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
