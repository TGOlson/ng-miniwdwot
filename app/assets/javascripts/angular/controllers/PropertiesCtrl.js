'use strict';

app.controller('PropertiesCtrl', ['$scope', 'Property', 'Organization', 'HandleError', function($scope, Property, Organization, HandleError) {

  $scope.search = Property.search;

  var options = {
    token: Organization.current.token,
    map_id: Organization.current.display_map_id
  }


  Property.query(options)
    .$promise
    .then( function ( obj ) {

      $scope.properties = obj;
      if(obj[0].address == 'empty_set') $scope.emptySet = true;

    })
    .catch(HandleError.newErr) 

}]);
