'use strict';

app.controller('PropertiesCtrl', 
  ['$scope',
   'Property',
   'Organization',
   'HandleError',
   'Flash',
   'leafletBoundsHelpers',

   function($scope, Property, Organization, HandleError, Flash, leafletBoundsHelpers) {

  $scope.search = Property.search;

  setProperties();

  $scope.paths = {};
  // $scope.center = {
  //   // zoom: 11,
  //   // autoDiscover: true    
  // };  

  var bounds = leafletBoundsHelpers.createBoundsFromArray([
       [ 42.08142291971749,  -83.10395838830034 ],
       [ 42.68142291971749,  -84.10395838830034 ]
  ]);

  $scope.bounds = bounds;

  // $scope.center = {
  //   lng: -83.10395838830034, lat: 42.38142291971749,
  //   zoom: 15

  // };


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
    var paths = {}

    // console.log(properties)

    for(var i = 0; i < properties.length; i++) {
      var property = properties[i]

      var parsedCoords = parseCoords(property.geometry);

      paths['prop' + i] = {
        weight: 1,
        latlngs: parsedCoords,
        type: 'polygon'
      }

    }

    $scope.paths = paths;
  }

  function parseCoords(geometry) {
    var coords = []

    for(var i = 0; i < 4; i++) {
      var latlng = {
        lat: parseFloat(geometry[i][1]),
        lng: parseFloat(geometry[i][0])
      }
      coords.push(latlng);
    }

    return coords;
  }
// [[-83.10395838830034,42.38142291971749],[-83.10409080915443,42.381373399085],[-83.10428274625332,42.38166054829529],[-83.10415032372813,42.381710069137746],[-83.10395838830034,42.38142291971749]]

    // $scope.paths = {


    //     example: {
    //         weight: 1,
    //         // stroke: '#333',
    //         // fill: '#aaa',
    //         // latlngs: [ { lat: 5, lng: 0.5 }, { lat: 7, lng: 0.7 }, { lat: 8, lng: 0.8 } ]
    //         latlngs: [
    //           {lng: -83.10395838830034, lat: 42.38142291971749}, 
    //           {lng: -83.10409080915443, lat: 42.381373399085}, 
    //           {lng: -83.10428274625332, lat: 42.38166054829529}, 
    //           {lng: -83.10415032372813, lat: 42.381710069137746}, 
    //         ],            
    //         // latlngs: [
    //         //   {lat: 2, lng: 2}, 
    //         //   {lat: 2, lng: 4}, 
    //         //   {lat: 4, lng: 4}, 
    //         //   {lat: 4, lng: 6}, 
    //         //   {lat: 6, lng: 8}
    //         // ],
    //         type: "polygon"
    //     }
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
