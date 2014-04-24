app.service('Property', ['$resource', function($resource) {

  var wdwot,
      resource;

  resource = $resource('/:maps/:map_id/properties/:property_id', 
      { map_id: '@map_id', property_id: '@property_id' }, 
      {
        query: {params: {maps: 'maps'}, isArray: true},
        update: {method:'PUT', params: {maps: 'maps'}}
      }
    );
  
  wdwot    = $resource('http://whydontweownthis.com/sc/mi/wayne/detroit/:id.json');

  var Property = function () {
    this.service = resource;
    this.wdwot   = wdwot;
  }

  // extend resource
  Property.prototype.query = function (args) {
    return this.service.query(args);
  }

  Property.prototype.get = function (args) {
    return this.service.get(args);
  }  

  Property.prototype.update = function (args) {
    return this.service.update(args);
  }

  return new Property();

}]);
