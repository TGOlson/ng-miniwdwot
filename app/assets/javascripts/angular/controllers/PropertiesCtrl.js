'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   '$location',

   function($scope, Property, Organization, HandleError, $location) {

  $scope.search = Property.search;


  // set header based on path
  ( function (location) {

    var path = $location.$$path.split('/')

    if(path[path.length - 1] === 'featured') {
      $scope.header = 'Featured Properties';
    } else {
      $scope.header = 'Properties';
    }

  })($location);


  var options = {
    token: Organization.current.token,
    map_id: Organization.current.display_map_id
  };


  Property.query(options).$promise
    .then( function ( obj ) {

      $scope.properties = obj;
      if(obj[0].address == 'empty_set') $scope.emptySet = true;

    })
    .catch(HandleError.newErr) 

}]);
