'use strict';

app.controller('OrganizationEditCtrl',
  [
    '$scope',
    '$location',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Flash',
    'Org',
    'Map',
    'HandleError',
    'Group',

    function ($scope, $location, $rootScope, $routeParams, Organization, Flash, Org, Map, HandleError, Group) {


    var orgId;



    // page initializers
    ( function () {

      orgId = $routeParams.id;


      // check admin privelages
      ( function () {
    
        // if the current user is an admin of current organization
        // if( !canEdit() ){
        if( false ){ // for debugging

          $location.path('/' + orgId);
          Flash.message('danger', 'You mussed be signed in as this organization to access that page.')

        }

      })();


      // default Org for two way binding, 
      $scope.organization = Org;

      // and get org info
      getOrg( getMaps );


    })();


    function canEdit () {

      // if user is logged in
      if( $rootScope.admin ) {

        // if logged in user id is equal to current organization
        if( $rootScope.admin.id == orgId ) {

          // allow editing
          return true

        }
      }

      // if not, boot 'em
      return false

    }



    function getOrg ( nextCall ) {

      Organization.get( { id: orgId } , function ( obj ) {

        // Here we manually call out each attribute
        // to preserve the two-way binding with other controllers.

        console.log(obj)

        for( var i in obj ){


          $scope.organization[i] = obj[i];

        }

        Group.query({ organization_id: orgId }, function ( obj ) {
          
          console.log('group', obj)
          $scope.groups = obj;

        }, HandleError)

        if( nextCall ) { nextCall(); }

      }, function( response ) { HandleError.newErr(response, getOrg) }  );

    }


    function getMaps () {

      if($scope.organization.display_group_id){

        var options = {
          group_id: $scope.organization.display_group_id,
          token: $scope.organization.token
        }


        Map.query(options, function (obj) {

          $scope.maps = obj;



          console.log('maps', $scope.maps)

        }, HandleError );


      }

    }

    // set hook for scope calls
    $scope.getMaps = getMaps;


    $scope.update = function() {


      var options = {
        id: $scope.organization.id,
        token: $scope.organization.token,
        organization: $scope.organization
      };

      Organization.update( options , function( obj ) {


        if( successfulCall( obj ) ){

          $location.path('/' + orgId);
          Flash.message('info', 'Organization successfully updated.');
        
        }
        

      }, function( response ) { HandleError.newErr(response, getOrg) }  );


    }


    $scope.cancel = function () {

      // revert to server organization settings
      getOrg();

      $location.path('/' + orgId );

      Flash.message('danger', 'Updates aborted.')
    }


    $scope.delete = function () {

      // if( confirm('Are you sure you want to submit?') ){

        var options = {
          id: $scope.organization.id,
          token: $scope.organization.token
        }

        // send id and token for validation
        Organization.delete( options, function ( obj ) {


          if( successfulCall( obj ) ){

            getOrg();
            $location.path('/');
            Flash.message('info', 'Organization deleted.')
          
          }


        }, function( response ) { HandleError.newErr(response, getOrg) } );
      // }

    }

    function successfulCall ( obj ) {

        if(!obj.failure){

          return true;
        
        } else {
          
          HandleError.newErr('failure', getOrg);
          return false;

        }
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;
    // dont provide canEdit hook for security reasons
    this.successfulCall = successfulCall;


}]);
