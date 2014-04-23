'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   'Flash',
   'leafletData',

   function($scope, Property, Organization, HandleError, Flash, leafletData) {

  $scope.search = Property.search;

  setProperties();

  $scope.paths = {};

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
        $scope.filteredProperties = obj;
        if(obj[0].address == 'empty_set') $scope.emptySet = true;
        setMap(obj);
      })
      .catch(HandleError.newErr);
  }


  function setMap(properties) {

    console.log('setting map', $scope.filteredProperties)

    var paths = {}

    for(var i = 0; i < properties.length; i++) {
      var property = properties[i]

      var parsedCoords = parseCoords(property.geometry);

      paths['prop' + i] = {
        // fill: '#',
        // stroke: '#',
        weight: 1,
        latlngs: parsedCoords,
        type: 'polygon',
        message: buildMessage(property)
      }

    }

    $scope.paths = paths;
    getBounds(paths);
  }

  $scope.setMap = setMap;

  function parseCoords(geometry) {
    return _.map(geometry, function (coords) {
      return {
        lat: parseFloat(coords[1]),
        lng: parseFloat(coords[0])
      }
    });
  }

  function buildMessage(property) {
    return "<a href='#/" + Organization.current.id + "/properties/" + property.fid  + "'><h4>" + property.address + "</h4></a>"
  }

  function getBounds(paths){
    leafletData.getMap().then(function(map) {

      var ps = _.map(paths, function (path) {
        return path.latlngs
      })

      if(!boundsSet){
        map.fitBounds(ps);
        boundsSet = true;
      }
    });
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
