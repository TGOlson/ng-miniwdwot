app.factory('Email', ['$resource', function ($resource) {

  var Email = $resource('/:type', {type: '@type'});

  return Email;

  
}]);
