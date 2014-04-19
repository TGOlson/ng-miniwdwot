'use strict';

app.controller('PropertyCtrl', 
  ['$scope',
   '$routeParams',
   'Property',
   'Organization',
   'Nav',
 
  function($scope, $routeParams, Property, Organization, Nav) {

  $scope.organization = Organization.current;

  if($scope.organization.id === null){
    var orgId = $routeParams.organization_id;
    Organization.setCurrent(orgId);
  }


  var id = $routeParams.property_id;

  getLocalPropertyInfo();
  getWdwotPropertyInfo();

  function getLocalPropertyInfo() {
    Property.get({property_id: id}).$promise
      .then(function (obj) {
        addDataToProperty(obj);
      });
      // .catch(HandleError.newErr); 
  }


  function getWdwotPropertyInfo() {
    Property.wdwot.get({id: id}).$promise
      .then(function (obj) {
        var parseData = parseResponse(obj);
        addDataToProperty(parseData)
      });
  }

  function addDataToProperty(data) {
    $scope.property = $scope.property || {};

    for(var i in data) {
      if(data.hasOwnProperty(i)) {
        $scope.property[i] = data[i];
      }
    }
  }


  function parseResponse(data) {

    var fields = [];

    for(var i in data.fields){

      var keyValuePair = {
        key: data.key[i],
        value: data.fields[i]
      };

      fields.push(keyValuePair);
    }

    return {
      blexts: data.blexts,
      headline: data.headline,
      id: data.id,
      fields: fields
    };
  }

}]);
