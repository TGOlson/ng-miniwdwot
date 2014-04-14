'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   '$location',
   'Flash',

   function($scope, Property, Organization, HandleError, $location, Flash) {

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


  // setPropertyLayout("rows")

  $scope.setPropertyLayout = function (style) {

    if(style === 'grid') {
      $scope.grid = true;
    } else {
      $scope.grid = false;
    }

  }

  setProperties();

  function setProperties() {

    var options = {
      token: Organization.current.token,
      map_id: Organization.current.display_map_id
    };


    Property.query(options).$promise
      .then( function (obj) {

        $scope.properties = obj;
        if(obj[0].address == 'empty_set') $scope.emptySet = true;

      })
      .catch(HandleError.newErr);

  }

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
      property_id: property.id,

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
