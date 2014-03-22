app.service('Organization', ['$resource', function($resource) {

  var Organization = $resource('/organizations/:id.json',

    { id: '@id' },

    { update:

      { method: "PUT" }

    });

  return Organization;

}]);
