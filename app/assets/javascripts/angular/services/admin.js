app.service('Admin', ['$resource', function($resource) {

  var Admin = {}

  Admin.signIn = $resource('/sign_in');

  return Admin;
}]);

