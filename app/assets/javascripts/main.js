'use strict';

var app = angular.module('miniwdwot', [
    'ngResource',
    'ngRoute'
  ]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/organizations/index.html',
      controller: 'OrganizationsCtrl'
    })
    .when('/:id', {
      templateUrl: '/assets/organization/index.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/properties', {
      templateUrl: '/assets/organization/properties.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/featured', {
      templateUrl: '/assets/organization/featured.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/about', {
      templateUrl: '/assets/organization/about.html',
      controller: 'OrganizationCtrl'
    })
    .when('/:id/edit', {
      templateUrl: '/assets/organization/edit.html',
      controller: 'OrganizationCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

}]);


// app.factory('Data', function() {

//   var message = "I'm data from a service";

//   function set (newMessage) {
//     message = newMessage;
//   }

//   function get () {
//     return { message: message };
//   }

//     return {
//       message: message,
//       set: set,
//       get: get
//     }
// })


// app.controller('FirstCtrl', function($scope, Data) {

//   $scope.data = Data;

//   console.log('1')

//   // setTimeout( function(){

//   //   $scope.data = Data.get();
//   //   console.log( Data.get() )

//   // }, 100)


//   // $scope.data = { message: 'something new' }

// })

// app.controller('SecondCtrl', function($scope, Data) {

//   $scope.data = Data;
//   console.log('2')

//   // Data.set( 'something cool' )

//   // console.log(Data.get())

//   // $scope.data.message = { message: 'a new' }
//   // Data = { message: 'hi again' }
//   // Data = 'seomthing new';
// })


// app.controller('AdminCtrl', ['$scope', 'Admin', 'Flash', '$rootScope', function($scope, Admin, Flash, $rootScope) {


// function SecondCtrl($scope, Data){
  // $scope.data = Data;
// }