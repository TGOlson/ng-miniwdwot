'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$location',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Flash',
    'Org',

    function ($scope, $location, $rootScope, $routeParams, Organization, Flash, Org) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $routeParams.id

    $scope.organization = Org;

    $rootScope.badOrg = false;

    // use this to prevent multiple calls to the server
    // organization data is reused if it exists
    if($scope.organization.id != orgId){

      setOrg();

    }

    function setOrg () {

      Organization.get({ id: orgId} , function ( obj ) {

        // Here we manually call out the attributes
        // that are needed inside any outside controllers.
        // This is done to preserve the two-way binding.
        $scope.organization.id       = obj.id;
        $scope.organization.name     = obj.name;
        $scope.organization.logo_url = obj.logo_url;

        // Set any remaining attributes for current scope.
        $scope.organization = obj;

        // organization is bad is no id present
        if(!obj.id){

          $rootScope.badOrg = true;

        }

      })
    }

    $scope.update = function() {

      Organization.update($scope.organization)

      $location.path('/' + orgId);

      Flash.message('info', 'Organization successfully updated.')
    }

    $scope.cancel = function () {

      // revert to server organization settings
      setOrg();

      $location.path('/' + orgId );

      Flash.message('danger', 'Updates aborted.')
    }

    $scope.delete = function () {

      if( confirm('Are you sure you want to submit?') ){

        // send entire organization for token validation
        Organization.delete($scope.organization , function ( obj ) {

          setOrg();

          $location.path('/');

          Flash.message('info', 'Organization deleted.')

        })
      }

    }

    $scope.$on('$routeChangeSuccess', function(next, current) {


      var isEditPath = ( $location.$$path == ('/' + orgId + '/edit') )

      // if the current user is an admin of current organization
      if( isEditPath && !canEdit() ){
      // if( false ){ // for debugging

        $location.path('/' + orgId);
        Flash.message('danger', 'You mussed be signed in as this organization to access that page.')

      }

    });


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


  }]);
