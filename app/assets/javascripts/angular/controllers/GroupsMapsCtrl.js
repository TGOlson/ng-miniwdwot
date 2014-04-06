'use strict';

app.controller('GroupsMapsCtrl', ['$scope', 'Group', 'Map', 'HandleError', 'Organization', function($scope, Group, Map, HandleError, Organization) {

  var org = Organization.current;


  // initializers
  ( function () {
    getGroups();
    getMaps();
  })();


  function getGroups(){
    var options = {organization_id: org.id};
    queryResource(Group, options, 'groups');
  }


  function getMaps() {

    // if the organization has a group set
    // then it is ready to query for maps
    if(org.display_group_id){

      var options = {
        group_id: org.display_group_id,
        token: org.token
      };

      queryResource(Map, options, 'maps');
    }
  }


  function queryResource(type, options, scopeName) {
    type.query(options)
      .$promise
      .then( function(obj) {
        $scope[scopeName] = obj;
      })
      .catch(HandleError.newErr);
  }

  // set hook for scope calls
  $scope.getMaps = getMaps;


}]);
