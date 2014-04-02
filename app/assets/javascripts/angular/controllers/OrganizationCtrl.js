'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$location',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Org',
    'HandleError',
    'Property',
    'Search',

    function ($scope, $location, $rootScope, $routeParams, Organization, Org, HandleError, Property, Search) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $routeParams.id

    $scope.organization = Org;

    $scope.search = Search;

    $rootScope.badOrg = false;

    // use this to prevent multiple calls to the server
    // organization data is reused if it exists
    if($scope.organization.id != orgId){

      getOrg();

    }



    function getOrg ( nextCall ) {

      Organization.get({ id: orgId } , function ( obj ) {

        // Here we manually call out each attribute
        // to preserve the two-way binding with other controllers.
        for( var i in obj ){

          $scope.organization[i] = obj[i];

        }

        // organization is bad if no id present
        if( !obj || !obj.id ) {

          $rootScope.badOrg = true;

        }

        if( nextCall ) { nextCall(); }


      }, HandleErrorWithGetOrg );
    }


    function HandleErrorWithGetOrg (response) {
       HandleError.newErr(response);
       getOrg(); 
    }

    // provide a hook for testing functions
    this.getOrg = getOrg;

  }]);
