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

    // page initializers
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

    $scope.colors = [
      'default',
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ]

    $scope.selectedColor = $scope.colors[0];


    $scope.previewColor = function (color) {
      $('body').attr('id', color);
    }

    $scope.setColor = function (color) {
      $('body').attr('id', color);
      $scope.selectedColor = color;
    }

    $scope.resetColor = function () {
      $('body').attr('id', $scope.selectedColor);
    }

    $scope.setColor($scope.selectedColor);

    function getOrg() {

      Organization.get({id: orgId}).$promise
        .then(parseOrgParams)
        .catch(editPageError);

    }


    function parseOrgParams(obj){

      for( var i in obj ){
        $scope.organization[i] = obj[i];
      }
      
      $scope.orgSet = true;
    }


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


    $scope.cancel = function () {

      // revert to server organization settings
      getOrg();
      Flash.msg.danger('updateAbort')
    }


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


    // all errors from the edit page involve resetting the org
    function editPageError(response) {
      HandleError.newErr(response);
      getOrg();
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;
    this.parseOrgParams = parseOrgParams;
    this.editPageError = editPageError;

}]);
