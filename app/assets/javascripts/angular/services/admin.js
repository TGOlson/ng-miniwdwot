app.service('Admin', ['$resource', function($resource) {

  Admin = $resource('http://whydontweownthis.com/users/sign_in.json')

  Admin.verify = $resource('/verify');

  return Admin

}]);
