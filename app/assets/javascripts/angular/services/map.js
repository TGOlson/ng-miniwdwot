app.service('Map', ['$resource', function($resource) {


  // Map = $resource('http://sitecontrol.us/groups/:group_id/maps.json', { group_id: '@group_id' });
  Map = $resource('/groups/:group_id/maps.json');

  return Map

}]);
