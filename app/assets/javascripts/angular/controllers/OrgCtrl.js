'use strict';

app.controller('OrgCtrl', ['$scope', 'Organization', '$routeParams', function ($scope, Organization, $routeParams) {

    var orgId = ($routeParams.id)

    Organization.get({ id: orgId}, function (obj) {

      $scope.org = obj;

    }, function (response) {

      $scope.org = {
        name: 'Error',
        email: 'Looks like this post is not around anymore'
      }

    });

    $scope.heading = 'Org ' + orgId;

  }]);
