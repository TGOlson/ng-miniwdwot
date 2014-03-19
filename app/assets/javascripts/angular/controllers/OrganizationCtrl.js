'use strict';

app.controller('OrganizationCtrl', ['$scope', 'Organization', '$location', '$rootScope', function ($scope, Organization, $location, $rootScope) {


    // need to backtrack to get params that are set before angular route
    var orgId = $location.$$absUrl.split('/organizations/')[1].split('#')[0]

    Organization.get({ id: orgId}, function (obj) {

      $scope.organization = obj;

    }, function (response) {

      $scope.organization = {
        name: 'Error: Looks like this organization is not around anymore.',
      }

    });

    $scope.heading = 'Organization ' + orgId;

  }]);
