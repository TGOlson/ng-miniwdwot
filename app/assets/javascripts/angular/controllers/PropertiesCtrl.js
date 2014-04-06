'use strict';

app.controller('PropertiesCtrl', ['$scope', 'Property', 'Organization', 'HandleError', function($scope, Property, Organization, HandleError) {

  console.log(Organization.current)

  var options = {
    token: Organization.current.token,
    map_id: Organization.current.display_map_id
  }


  Property.query( options, function ( obj ) {

    $scope.properties = obj;

      if(obj[0].address == 'empty_set'){
        $scope.emptySet = true;
        
        console.log('empty')
      }

  }, HandleError.newErr ); 


}]);
