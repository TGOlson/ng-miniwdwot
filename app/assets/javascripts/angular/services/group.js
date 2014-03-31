app.service('Group', ['$resource', function($resource) {


  return $resource('/organizations/:organization_id/groups');

}]);
