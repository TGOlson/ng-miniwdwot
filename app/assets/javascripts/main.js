'use strict';

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute'
  ]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/organizations/index.html',
      controller: 'OrganizationsCtrl'
    })
    .when('/:id', {
      templateUrl: '/templates/organization/index.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/properties', {
      templateUrl: '/templates/organization/properties.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/featured', {
      templateUrl: '/templates/organization/featured.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/about', {
      templateUrl: '/templates/organization/about.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/edit', {
      templateUrl: '/templates/organization/edit.html',
      controller: 'OrganizationCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
