'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   'Flash',

   function($scope, Property, Organization, HandleError, Flash) {

  $scope.search = Property.search;

  setProperties();


  $scope.setPropertyLayout = function (style) {

    if(style === 'grid') {
      $scope.grid = true;
    } else {
      $scope.grid = false;
    }
  }

  $scope.clearSearch = function () {
    $scope.search.text = null;
  }


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

  $scope.toggleMap = function () {
    $scope.hideMap = !$scope.hideMap;
  }

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
