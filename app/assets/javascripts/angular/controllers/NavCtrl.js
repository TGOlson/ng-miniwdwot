'use strict';

app.controller('NavCtrl', 
  
  ['$scope',
   'Organization',
   '$location',
   '$rootScope',

   function($scope, Organization, $location, $rootScope) {

  // bind nav $scope.organization to Org service
  $scope.organization = Organization.current;

  $scope.$on('$routeChangeStart', function(){

    // reset to defaults
    $scope.hideNav = false;
    $scope.hideAll = false;
  
    $rootScope.badOrg = false;

    // hide nav for root path
    if( $location.$$path === '/' ){

      $scope.hideAll = true;

    } else {

      // parse path to match route names
      var path = $location.$$path.split('/')

      // hide navigation during editing
      if( path === 'edit' ) $scope.hideNav = true;

    }

  });


}]);
