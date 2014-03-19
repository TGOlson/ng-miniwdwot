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

app.controller('OrgsCtrl', ['$scope', 'Organization', function($scope, Organization) {

  $scope.orgs = Organization.query();

  // $scope.org  = Orgs.show()

}]);
