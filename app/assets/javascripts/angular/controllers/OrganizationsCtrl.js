'use strict';

app.controller('OrganizationsCtrl', ['$scope', 'Organization', 'HandleError', function($scope, Organization, HandleError) {

  Organization.query( function ( obj ) {

    $scope.organizations = obj;
  
  }, HandleError.newErr );

}]);
