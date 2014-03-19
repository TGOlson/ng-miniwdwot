'use strict';

app.controller('OrganizationCtrl', ['$scope', 'Organization', '$routeParams', '$rootScope', function ($scope, Organization, $routeParams, $rootScope) {

    var orgId = ($routeParams.id)

    Organization.get({ id: orgId}, function (obj) {

      $rootScope.organization = obj;

    }, function (response) {

      $scope.organization = {
        name: 'Error: Looks like this organization is not around anymore.',
      }

    });

    $scope.heading = 'Organization ' + orgId;

  }]);
