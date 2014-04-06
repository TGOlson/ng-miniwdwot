app.service('Map', ['$resource', function($resource) {

  return $resource('/groups/:group_id/maps');

}]);
