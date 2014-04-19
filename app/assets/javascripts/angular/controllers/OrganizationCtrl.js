'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$rootScope',
    '$routeParams',
    'Organization',
    'HandleError',

    function ($scope, $rootScope, $routeParams, Organization, HandleError) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $routeParams.id;

    $scope.organization = Organization.current;

    // *** 
    // causes some bugs, 
    // noMapSet will reset if this setting is used
    // consider adding back later 
    // ***

    // use this to prevent multiple calls to the server
    // organization data is reused if it exists
    if(!$scope.organization.id || $scope.organization.id != orgId){
      getOrg();
    } else {
      checkIfMapSet();
    }


    function getOrg() {
      Organization.setCurrent(orgId)
        .then(checkIfMapSet);
    }

    function checkIfMapSet() {
      if(!$scope.organization.display_map_id) { 
        $scope.noMapSet = true;
      } else {
        $scope.noMapSet = false;
      }
    }


    $scope.toggleMap = function () {
      $scope.hideMap = !$scope.hideMap;
    }


    function handleErrorAsBadOrg(response) {
      $rootScope.badOrg = true
      HandleError.newErr(response);
    }

    // provide a hook for testing functions
    // consider using exports
    this.getOrg = getOrg;
    this.handleErrorAsBadOrg = handleErrorAsBadOrg;

  }]);
