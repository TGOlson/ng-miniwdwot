'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   'Flash',
   'MapHelper',

   function($scope, Property, Organization, HandleError, Flash, MapHelper) {

  $scope.search = Property.search;

  setProperties();

  $scope.paths = {};

  $scope.tiles = {
    url: 'http://{s}.tiles.mapbox.com/v3/loveland.h2nk5m03/{z}/{x}/{y}.png'
  }

  var boundsSet = false;

  $scope.center = {
    lat: 42.344,  
    lng: -83.0358,
    zoom: 12,
  };  

  function setProperties() {

    var options = {
      token: Organization.current.token,
      map_id: Organization.current.display_map_id
    };


    Property.query(options).$promise
      .then(function (obj) {
        $scope.properties = obj;
        if(obj[0].address == 'empty_set') $scope.emptySet = true;
        setMap(obj);
      })
      .catch(HandleError.newErr);
  }


  function setMap(properties) {
    var paths = MapHelper.parsePaths(properties)
    $scope.paths = paths;
   
    if(!boundsSet){
      setTimeout(function () {
        MapHelper.setBounds(paths);
        boundsSet = true;
      }, 100)
    }
  }

  $scope.setMap = setMap;


  // set hook for view
  $scope.setProperties = setProperties();

  $scope.toggleFeatured = function (property) {
    updateProperty(property)
  }

  $scope.updateTags = function (property) {
    updateProperty(property)
  }

  $scope.addTag = function (property) {
    property.tags.push('')
  }

  $scope.deleteTag = function (property, index) {
    property.tags.pop(index)
    updateProperty(property)
  }

  function updateProperty(property) {
    var options = {
      map_id: Organization.current.display_map_id,
      property_id: property.fid,

      // only need to pass featured and tags for now
      property: {
        featured: property.featured,
        tags: property.tags
      }
    }

    Property.update(options).$promise
      .then( function (obj) {
        Flash.msg.info('propertyUpdateSuccess');
      })
      .catch(HandleError.newErr); 
  }

}]);
