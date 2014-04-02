'use strict';

app.controller('PropertiesCtrl', ['$scope', 'Property', 'Org', 'HandleError', function($scope, Property, Org, HandleError) {

  var options = {
    token: Org.token,
    map_id: Org.display_map_id
  }


  Property.query( options, function ( obj ) {

    $scope.properties = obj;

      if(obj[0].address == 'empty_set'){
        $scope.emptySet = true;
        
        console.log('empty')
      }

  }, HandleError.newErr ); 


}]);
