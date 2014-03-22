'use strict';

app.controller('OrganizationsCtrl', ['$scope', 'Organization', function($scope, Organization) {

  $scope.organizations = Organization.query();

}]);
