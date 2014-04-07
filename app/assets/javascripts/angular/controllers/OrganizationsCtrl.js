'use strict';

app.controller('OrganizationsCtrl', ['$scope', 'Organization', 'HandleError', function($scope, Organization, HandleError) {

  Organization.query().$promise
    .then(setOrgs)
    .catch(HandleError.newErr)

  function setOrgs(obj){
    $scope.organizations = obj;  
  }

}]);
