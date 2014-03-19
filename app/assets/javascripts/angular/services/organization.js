app.service('Organization', ['$resource', function($resource) {

  var Organization = $resource('/organizations/:id.json');

  return Organization;
}]);


// angular.module('bulletinStandaloneApp')
//   .service('Post', ['$resource', function($resource) {


//     return Post;

// }]);


  // function Orgs() {
  //   this.service = $resource('/organizations.json');
  // };

  // Orgs.prototype.all = function() {
  //   return this.service.query();
  // };

  // Orgs.prototype.show = function() {
  //   return this.service.query();
  // };