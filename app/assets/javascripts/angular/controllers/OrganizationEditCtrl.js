'use strict';

app.controller('OrganizationEditCtrl',
  [
    '$scope',
    '$location',
    'Admin',
    '$routeParams',
    'Organization',
    'Flash',
    'Map',
    'HandleError',
    'Group',

    function ($scope, $location, Admin, $routeParams, Organization, Flash, Map, HandleError, Group) {


    var orgId;

    // page initializers
    ( function () {

      orgId = $routeParams.id;

      // comment out for debugging
      // Admin.verifyCanEdit(orgId);

      // default Org for two way binding,
      $scope.organization = Organization.current;

      getOrg();

    })();

    function getOrg() {

      Organization.get({id: orgId})
        .$promise
        .then(parseOrgParams)
        .catch(editPageError);

    }


    function parseOrgParams(obj){
      for( var i in obj ){
        $scope.organization[i] = obj[i];
      }
      $scope.orgSet = true;
    }


    $scope.update = function() {

      var options = {
        id: $scope.organization.id,
        token: $scope.organization.token,
        organization: $scope.organization
      };

      Organization.update(options)
        .$promise
        .then( function (){
          Flash.message('info', 'Organization successfully updated.');
        })
        .catch(editPageError)

    }


    $scope.cancel = function () {

      // revert to server organization settings
      getOrg();
      Flash.message('danger', 'Updates aborted.')
    }


    $scope.delete = function () {

      if( confirm('Are you sure you want to submit?') ){

        var options = {
          id: $scope.organization.id,
          token: $scope.organization.token
        }

        // send id and token for validation
        Organization.delete(options) 
          .$promise
          .then( function () {
            $location.path('/');
            Flash.message('info', 'Organization deleted.')            
          })
          .catch(editPageError)

      }

    }



    // all errors from the edit page involve resetting the org
    function editPageError ( response ) {
      HandleError.newErr(response);
      getOrg();
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;

}]);
