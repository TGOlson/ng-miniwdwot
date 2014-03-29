'use strict';

app.controller('OrganizationsCtrl', ['$scope', 'Organization', function($scope, Organization) {

  Organization.query( function ( obj ) {

    $scope.organizations = obj;
  
  });

}]);
