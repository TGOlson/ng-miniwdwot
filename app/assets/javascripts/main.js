'use strict';

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute',
    'ngCookies',
    "xeditable"
  ]);

app.run(function(editableOptions, editableThemes) {
  editableOptions.theme = 'bs3';

  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';

  editableThemes['bs3'].submitTpl = null;
  editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-default btn-sm" ng-click="deleteTag(property, $index); $hide();"><span class="glyphicon glyphicon-remove"></span></button>'
});

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
      controller: 'OrganizationEditCtrl'
    })
    .when('/:organization_id/properties/:property_id', {
      templateUrl: '/templates/property/index.html',
      controller: 'PropertyCtrl'
    })    
    .otherwise({
      redirectTo: '/'
    });

}]);
