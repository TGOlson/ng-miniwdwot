'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Email',
    'Flash',

    function ($scope, $rootScope, $routeParams, Organization, Email, Flash) {

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

      email.to     = $scope.organization.contact_email;
      email.org_id = $scope.organization.id;

      var options = {
        email: email,
        type: 'property_inquiry'
      };

      Email.save(options).$promise
        .then(function (obj) {
          if(obj.success){
            console.log(obj);
            Flash.msg.info('emailSuccess')
          }
        }, function (err) {
          console.log('err', err)
        });
    }

}]);
