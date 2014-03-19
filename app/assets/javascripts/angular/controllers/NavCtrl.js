'use strict';


// angular.module('miniwdwot')
//   .controller('OrgsCtrl', ['$scope', function ($scope) {

//     $scope.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];


//     $scope.cool = 'Hey'

//   }]);

// console.log('hi')

app.controller('NavCtrl', ['$scope', 'Organization', '$routeParams', function($scope, Organization, $routeParams) {

    var orgId = ($routeParams.id)

    Organization.get({ id: orgId}, function (obj) {

      $scope.organization = obj;

    }, function (response) {

      $scope.organization = {
        name: 'Error: Looks like this organization is not around anymore.',
      }

    });



  // $scope.organization = Organization.currentOrg();

  // $scope.org  = Orgs.show()

}]);
