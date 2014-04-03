'use strict';

app.controller('GroupsMapsCtrl', ['$scope', 'Group', 'Map', 'HandleError', 'Org', function($scope, Group, Map, HandleError, Org) {

  var organization = Org;

  console.log(organization)

  function getGroups () {

    Group.query({ organization_id: Org.id }, function ( obj ) {

      $scope.groups = obj;

    }, editPageError)

  }


  function getMaps () {

    if($scope.organization.display_group_id){

      var options = {
        group_id: $scope.organization.display_group_id,
        token: $scope.organization.token
      }

      Map.query(options, function (obj) {
        $scope.maps = obj;
      }, editPageError );

    }
  }

  // set hook for scope calls
  $scope.getMaps = getMaps;


}]);
