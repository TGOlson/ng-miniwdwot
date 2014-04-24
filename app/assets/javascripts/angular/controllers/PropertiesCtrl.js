'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   'Flash',
   'MapHelper',
   '$filter',

   function($scope, Property, Organization, HandleError, Flash, MapHelper, $filter) {


  /*
   * Initializers
   */

   $scope.search = {};

  // Map defaults
  $scope.paths = {};
  $scope.tiles = {
    url: 'http://{s}.tiles.mapbox.com/v3/loveland.h2nk5m03/{z}/{x}/{y}.png'
  };

  $scope.center = {
    lat: 42.344,  
    lng: -83.0358,
    zoom: 12,
  };  

  var boundsSet = false;

  setProperties();

  $scope.$watchCollection('search', filterProperties);


  /*
   * Get and set properties
   */ 

  function setProperties() {

    var options = {
      token: Organization.current.token,
      map_id: Organization.current.display_map_id
    };


    Property.query(options).$promise
      .then(function (obj) {
        $scope.properties = obj;
        $scope.filteredProperties = obj;
      
        if(obj[0].address == 'empty_set') $scope.emptySet = true;
        setMap(obj);
      })
      .catch(HandleError.newErr);
  }


  /*
   * Set properties on map
   */ 

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


  /*
   * Filter properties
   */

  function filterProperties(newVal) {
    var filtered;

    filtered = $filter('filter')($scope.properties, newVal.text);
    filtered = $filter('featured')(filtered, newVal.featured);

    $scope.filteredProperties = filtered;

    if(filtered) setMap(filtered);
  }

  /*
   * Reset search
   */

   $scope.clearSearch = function () {
    $scope.search = {
      text: null,
      featured: null
    }
   }

  /*
   * Edit page functions
   */

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


  /*
   * Update property
   */

  function updateProperty(property) {

    var options = {
      map_id: Organization.current.display_map_id,
      property_id: property.fid,
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
