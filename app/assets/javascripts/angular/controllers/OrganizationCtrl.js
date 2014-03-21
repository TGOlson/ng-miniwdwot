'use strict';

app.controller('OrganizationCtrl',
  ['$scope', 'Organization', '$location', 'Flash', '$rootScope', '$window',
  function ($scope, Organization, $location, Flash, $rootScope, $window) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $('#orgId').data().id

    setOrg();

    function setOrg () {

      Organization.get({ id: orgId} , function ( obj ) {

        $scope.organization = obj;
        if(!obj.id){ $scope.badOrg = true; }

      })
    }

    $scope.update = function() {

      Organization.update($scope.organization)

      $location.path('/');
      Flash.message('info', 'Organization successfully updated.')

    }

    $scope.cancel = function () {

      // revert to server organization settings
      setOrg();

      $location.path('/');
      Flash.message('danger', 'Updates aborted.')

    }

    $scope.delete = function () {

      if(confirm('Are you sure you want to submit?')){

        // send entire organization for token validation
        Organization.delete($scope.organization , function ( obj ) {

          setOrg();
          $location.path('/');
          Flash.message('info', 'Organization deleted.')

        })

      }
    }

    $scope.$on('$routeChangeStart', function(next, current) {

      $scope.path = $location.$$path
      $scope.hideNav = false;

      if($scope.path === '/edit'){

        // if( canEdit() ){
        if( true ){

          $scope.hideNav = true;

        } else {

          $location.path('/');
          Flash.message('danger', 'You mussed be signed in as the organization to access that page.')

        }

      }

    });

    function canEdit () {
      if( $rootScope.admin ) {
        if( $rootScope.admin.id == orgId ) {
          return true
        }
      }
      return false
    }

  }]);
