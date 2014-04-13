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
    // if($scope.organization.id != orgId){
      getOrg();
    // }


    function getOrg() {

      Organization.get({ id: orgId }).$promise
        .then(parseOrganization)
        .catch(handleErrorAsBadOrg);
    
    }

    function parseOrganization(obj) {

      // Here we manually call out each attribute
      // to preserve the two-way binding with other controllers.
      for( var i in obj ){
        $scope.organization[i] = obj[i];
      }

      // if no map id is set the group settings are fully configured
      if(!obj.display_map_id) { 
        $scope.noMapSet = true;
      } else {
        $scope.noMapSet = false;
      }

      Organization.loadColorScheme();
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
    this.parseOrganization = parseOrganization;
    this.handleErrorAsBadOrg = handleErrorAsBadOrg;

  }]);
