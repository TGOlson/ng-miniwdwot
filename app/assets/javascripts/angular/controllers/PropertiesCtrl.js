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
  // setMap();


  function setProperties() {

    var options = {
      token: Organization.current.token,
      map_id: Organization.current.display_map_id
    };


    Property.query(options).$promise
      .then(function (obj) {
        $scope.properties = obj;
        if(obj[0].address == 'empty_set') $scope.emptySet = true;
      })
      .catch(HandleError.newErr);
  }

  // function setMap() {
  //   // $('#map').clear()
  //   var map = L.mapbox.map('map', 'loveland.h2nk5m03').setView([40, -74.50], 9);
  // }

      // <iframe width='100%' height='300px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/loveland.h2nk5m03/mm/zoompan,zoomwheel,geocoder,share.html' ng-hide='hideMap' class='map-border'></iframe>


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
