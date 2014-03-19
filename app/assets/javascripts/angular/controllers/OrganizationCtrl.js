'use strict';

app.controller('OrganizationCtrl', ['$scope', 'Organization', '$location', function ($scope, Organization, $location) {

    // need to backtrack to get params that are set before angular route
    var orgId = $location.$$absUrl.split('/organizations/')[1].split('#')[0]

    // var orgId = 1;

    // console.log($routeParams)

    Organization.get({ id: orgId}, function ( obj ) {

      $scope.organization = obj;

      if(!obj.id){

        $scope.badOrg = true;

      }

    })


    $scope.update = function() {

      // $scope.newOrg.id = orgId;

      Organization.update($scope.organization)

      $location.path('/');


    //   , function(resource) {

    //     console.log(resource)

    //     // $scope.newOrg = {};

    //   }, function(response) {

    //     console.log('failed', response)
    //   });
    }


  }]);
