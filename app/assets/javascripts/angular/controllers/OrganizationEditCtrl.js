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

      getAllData();


    })();


    function getAllData () {

      getOrg()
        .then(getGroups)
        .then(getMaps)
        .done();
    
    }


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


    function getOrg () {
      var deferred = Q.defer();

      Organization.get( { id: orgId } , function ( obj ) {

        // wait until organization params are done parsing
        // before declaring resolved
        Q.fcall(parseOrgParams, obj)
          .then(deferred.resolve)
        
      // should probably declare deferred.reject below
      }, editPageError );

      return deferred.promise;
    }
    

    function parseOrgParams(obj){
      for( var i in obj ){
        $scope.organization[i] = obj[i];
      }
    }


    function getGroups () {

        Group.query({ organization_id: orgId }, function ( obj ) {
          
          $scope.groups = obj;

        }, editPageError)
      
    }


    function getMaps () {

      if($scope.organization.display_group_id){


        var options = {
          group_id: $scope.organization.display_group_id,
          token: $scope.organization.token
        }


        Map.query(options, function (obj) {

          $scope.maps = obj;

        }, editPageError );


      }

    }

    // set hook for scope calls
    // $scope.getMaps = getMaps;


    $scope.update = function() {


      var options = {
        id: $scope.organization.id,
        token: $scope.organization.token,
        organization: $scope.organization
      };

      Organization.update( options , function( obj ) {


        if( successfulCall( obj ) ){

          Flash.message('info', 'Organization successfully updated.');
        
        }
        

      }, editPageError );


    }


    $scope.cancel = function () {

      // revert to server organization settings
      getAllData();

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


        }, editPageError );
      // }

    }

    function successfulCall ( obj ) {

        if(!obj.failure){

          return true;
        
        } else {
          
          HandleError.newErr('failure', getAllData);
          return false;

        }
    }

    // all errors from the edit page involve resetting the org
    function editPageError ( response ) {
      HandleError.newErr(response)
      getAllData()
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;
    // dont provide canEdit hook for security reasons
    this.successfulCall = successfulCall;


}]);
