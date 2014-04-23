app.factory('MapHelper', ['Organization', 'leafletData', function (Organization, leafletData) {


  function parsePaths(properties) {

    var paths = {}

    for(var i = 0; i < properties.length; i++) {
      var property = properties[i]

      var parsedCoords = parseCoords(property.geometry);

      paths[property.fid] = {
        weight: 2,
        latlngs: parsedCoords,
        type: 'polygon',
        message: buildMessage(property)
      }

    }

    return paths;
  }

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

  function setBounds(paths){
    leafletData.getMap().then(function(map) {

      var ps = _.map(paths, function (path) {
        return path.latlngs
      })

      map.fitBounds(ps);
    });
  }


  return {
    parsePaths: parsePaths,
    setBounds: setBounds
  }

}]);
