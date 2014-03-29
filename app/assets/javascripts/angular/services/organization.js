app.service('Organization', ['$resource', function($resource) {

  return $resource('/organizations/:id', { id: '@id' },
    { update: { method: "PUT" } });

}]);
