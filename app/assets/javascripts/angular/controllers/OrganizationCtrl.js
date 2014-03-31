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

    function ($scope, $location, $rootScope, $routeParams, Organization, Org, HandleError, Property) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $routeParams.id

    $scope.organization = Org;

    $rootScope.badOrg = false;

    // use this to prevent multiple calls to the server
    // organization data is reused if it exists
    if($scope.organization.id != orgId){

      getOrg( getProperties );

    } else if ( !$scope.properties ) {

      // properties array refreshes
      // may want to wrap a property controller
      console.log('getting properties')
      console.log($scope.properties)
      getProperties();

    }



    function getOrg ( nextCall ) {

      Organization.get( { id: orgId } , function ( obj ) {

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



    function getProperties () {

      if($scope.organization.display_map_id && !$scope.properties){


        var options = {
          token: $scope.organization.token,
          map_id: $scope.organization.display_map_id,
        }

        Property.query( options, function ( obj ) {

          $scope.properties = obj;

          // if(obj.length === 1){
            if(obj[0].address == 'empty_set'){
              $scope.emptySet = true;
              
              console.log('empty')
            }
          // }

          console.log($scope.properties)

        }, HandleError );

      }
    }


    function HandleErrorWithGetOrg ( response ) {
       HandleError.newErr(response, getOrg); 
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;

  }]);
