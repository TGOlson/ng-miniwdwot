'use strict';

app.controller('OrganizationEditCtrl',
  [
    '$scope',
    '$location',
    '$routeParams',
    'Admin',
    'Organization',
    'Flash',
    'HandleError',

    function ($scope, $location, $routeParams, Admin, Organization, Flash, HandleError) {


    var orgId;

    /*
     * page initializers
     */

    ( function () {

      orgId = $routeParams.id;

      // check if user is logged in
      // and is admin of current org
      // otherwise redirect home
      // Admin.verifyCanEdit(orgId); // comment out for debugging

      // default Org for two way binding,
      $scope.organization = Organization.current;

      getOrg();

    })();


    /*
     * get org from server
     */

    function getOrg() {

      Organization.get({id: orgId}).$promise
        .then(parseOrgParams)
        .catch(editPageError);

    }


    /*
     * parse organization params to keep two way binding
     */

    function parseOrgParams(obj){

      for( var i in obj ){
        $scope.organization[i] = obj[i];
      }
      
      Organization.loadColorScheme();

      // notify view that the org is set
      $scope.orgSet = true;
    }


    /*
     * Color Definitions and Actions
     */

    // load color options from organization
    $scope.colors = Organization.colors;


    // preview color without saving
    $scope.previewColor = function (color) {
      Organization.previewColorScheme(color);
    }

    // set color to organization
    $scope.setColor = function (color) {
      $scope.organization.color_scheme = color;
      $scope.update();
    }

    // reset to last saved org color scheme
    $scope.resetColor = function () {
      Organization.loadColorScheme();
    }


    /*
     * update
     */

    $scope.update = function () {

      var org = $scope.organization;

      var options = {
        id:           org.id,
        token:        org.token,
        organization: org
      };

      Organization.update(options).$promise
        .then( function (){
          Flash.msg.info('updateSuccess');
        })
        .catch(editPageError)

    }


    /*
     * cancel updates
     */

    $scope.cancel = function () {

      // revert to server organization settings
      getOrg();
      Flash.msg.danger('updateAbort')
    }


    /*
     * delete org
     */

    $scope.delete = function () {

      if( confirm('Are you sure you want to submit?') ){

        var org = $scope.organization;

        var options = {
          id:    org.id,
          token: org.token
        }

        // send id and token for validation
        Organization.delete(options).$promise
          .then( function () {
            $location.path('/');
            Flash.msg.info('deleteSuccess')            
          })
          .catch(editPageError)

      }

    }

    /*
     * display edit page error
     */

    // all errors from the edit page involve resetting the org
    function editPageError(response) {
      HandleError.newErr(response);
      getOrg();
    }


    // provide a hook for testing functions
    // consider using node-style module exports
    this.getOrg = getOrg;
    this.parseOrgParams = parseOrgParams;
    this.editPageError = editPageError;

}]);
