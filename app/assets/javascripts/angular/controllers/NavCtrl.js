'use strict';

app.controller('NavCtrl', 
  
  ['$scope',
   'Organization',
   '$location',
   'Property',
   '$rootScope',

   function($scope, Organization, $location, Property, $rootScope) {

  // bind nav $scope.organization to Org service
  $scope.organization = Organization.current;

  $scope.search = Property.search;

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

      $scope.path = path[ path.length - 1 ]

      // hide navigation during editing
      if( $scope.path === 'edit' ) $scope.hideNav = true;

    }

  });

  $scope.clearSearch = function () {
    $scope.search.text = null;
  }


}]);
