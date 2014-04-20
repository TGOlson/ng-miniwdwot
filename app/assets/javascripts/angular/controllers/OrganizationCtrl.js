'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$rootScope',
    '$routeParams',
    'Organization',

    function ($scope, $rootScope, $routeParams, Organization) {

    var id = $routeParams.id;

    $scope.organization = Organization.current;

    getOrg();

    function getOrg() {
      Organization.setCurrent(id)
        .then(checkIfMapSet);
    }

    function checkIfMapSet() {
      if(!$scope.organization.display_map_id) { 
        $scope.noMapSet = true;
      } else {
        $scope.noMapSet = false;
      }
    }

    $scope.sendEmail = function (email) {
      email.to = $scope.organization.contact_email;

      console.log(email);



    }

}]);
