'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Email',

    function ($scope, $rootScope, $routeParams, Organization, Email) {

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

      var options = {
        email: email,
        type: 'property_inquiry'
      };

      Email.save(options).$promise
        .then(function (obj) {
          console.log(obj);
        }, function (err) {
          console.log('err', err)
        });


    }

}]);
