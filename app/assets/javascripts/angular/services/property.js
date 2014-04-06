app.service('Property', ['$resource', function($resource) {

  var wdwot,
      resource;

  resource = $resource('/maps/:map_id/properties');
  
  wdwot    = $resource('http://whydontweownthis.com/sc/mi/wayne/detroit/:id.json');

  var Property = function () {
    this.search  = {text: null};
    this.service = resource;
    this.wdwot   = wdwot;
  }

  // extend resource
  Property.prototype.query = function (args) {
    return this.service.query(args)
  }

  Property.prototype.get = function (args) {
    return this.service.get(args)
  }

  return new Property();

}]);
