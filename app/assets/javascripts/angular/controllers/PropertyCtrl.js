'use strict';

app.controller('PropertyCtrl', 
  ['$scope',
   '$routeParams',
   'Property',
   'Organization',
   'Nav',
   'Email',
   'Flash',
   'MapHelper',
 
  function($scope, $routeParams, Property, Organization, Nav, Email, Flash, MapHelper) {

  $scope.organization = Organization.current;

  if($scope.organization.id === null){
    var orgId = $routeParams.organization_id;
    Organization.setCurrent(orgId);
  }

  $scope.paths = {};

  $scope.tiles = {
    url: 'http://{s}.tiles.mapbox.com/v3/loveland.h2nk5m03/{z}/{x}/{y}.png'
  }

  $scope.center = {
    lat: 42.344,  
    lng: -83.0358,
    zoom: 12,
  }; 


  var id = $routeParams.property_id;

  getLocalPropertyInfo();
  getWdwotPropertyInfo();

  function getLocalPropertyInfo() {
    Property.get({property_id: id}).$promise
      .then(function (obj) {
        addDataToProperty(obj);
        setMap(obj);
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

  function setMap(property) {
    var paths = MapHelper.parsePaths([property])
    $scope.paths = paths;
   
    var latlng = paths[property.fid].latlngs[0]

    $scope.center = {
      lat: latlng.lat,
      lng: latlng.lng,
      zoom: 16
    }
  }

  $scope.setMap = setMap;


  $scope.sendEmail = function (email) {

    email.to     = $scope.organization.contact_email;
    email.org_id = $scope.organization.id;

    var options = {
      email: email,
      type: 'property_inquiry'
    };

    Email.save(options).$promise
      .then(function (obj) {
        if(obj.success){
          console.log(obj);
          Flash.msg.info('emailSuccess')
        }
      }, function (err) {
        console.log('err', err)
      });
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
