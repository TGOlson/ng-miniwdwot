'use strict';

app.controller('OrganizationsCtrl', ['$scope', 'Organization', 'HandleError', function($scope, Organization, HandleError) {

  Organization.query()
    .$promise
    .then( function (obj){
      $scope.organizations = obj;
    })
    .catch(HandleError.newErr)

}]);
