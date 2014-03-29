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

        console.log(obj)

        // Here we manually call out each attribute
        // to preserve the two-way binding with other controllers.
        for( var i in obj ){

          $scope.organization[i] = obj[i];

        }

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

      console.log($scope.organization)

      if( confirm('Are you sure you want to submit?') ){

        var options = {
          id: $scope.organization.id,
          token: $scope.organization.token,
        }

        // send entire id and token for validation
        Organization.delete( options, function ( obj ) {

          setOrg();

          $location.path('/');

          Flash.message('info', 'Organization deleted.')


        }, function(res) {

          console.log(res)

        })
      }

    }

    $scope.$on('$routeChangeSuccess', function(next, current) {


      var isEditPath = ( $location.$$path == ('/' + orgId + '/edit') )

      // if the current user is an admin of current organization
      // if( isEditPath && !canEdit() ){
      if( false ){ // for debugging

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
