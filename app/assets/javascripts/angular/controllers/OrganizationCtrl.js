'use strict';

app.controller('OrganizationCtrl',
  [
    '$scope',
    '$location',
    '$rootScope',
    '$routeParams',
    'Organization',
    'Org',
    'HandleError',
    'Property',

    function ($scope, $location, $rootScope, $routeParams, Organization, Org, HandleError, Property) {

    // grab organization id from data attribute
    // this id is set before angular takes over
    var orgId = $routeParams.id

    $scope.organization = Org;

    $rootScope.badOrg = false;

    // use this to prevent multiple calls to the server
    // organization data is reused if it exists
    if($scope.organization.id != orgId){

      getOrg( getProperties );

    } else if ( !$scope.properties ) {

      getProperties();

    }



    function getOrg ( nextCall ) {

      Organization.get( { id: orgId } , function ( obj ) {

        // Here we manually call out each attribute
        // to preserve the two-way binding with other controllers.
        for( var i in obj ){

          $scope.organization[i] = obj[i];

        }

        // organization is bad if no id present
        if( !obj || !obj.id ) {

          $rootScope.badOrg = true;

        }

        if( nextCall ) { nextCall(); }


      }, HandleErrorWithGetOrg );
    }



    function getProperties () {

      // options = {
      //   token: userToken
      // }

      // $.ajax({
      //     type: "GET",
      //     url: 'http://'+groupNameSlug+'.sitecontrol.us/m/'+mapNameSlug+'/blocks/' + hood + '.json?',
      //     crossDomain: true,
      //     timeout: 150000,
      //     data: options,
      //     dataType: "json",
      //     success: function(data){
      //         BESUCCESSFUL!
      //     });
      // });

      // groupNameSlug = The group that the selected map belongs to.
      // mapNameSlug   =  The requested map.
      // userToken         = The logged in org/user auth token.

      // This will return an array of all tagged properties in the map along with a key for each tag.

      if($scope.organization.display_group_id && $scope.organization.display_map_id){


        var options = {
          token: $scope.organization.token,
          group_id: $scope.organization.display_group_id,
          map_id: $scope.organization.display_map_id,
          only_tagged: 1
        }

        Property.get( options, function ( obj ) {

          console.log(obj)

          $scope.properties = ( function( obj ) {

            var properties = [];

            for( var i in obj.features ){

              properties.push(obj.features[i].properties)

            }

            return properties;

          })( obj );

          console.log($scope.properties)

        }, HandleError );

        // $scope.properties = [
        //   { id: 1, name: 'Prop1'},
        //   { id: 1, name: 'Prop2'},
        //   { id: 1, name: 'Prop3'},
        //   { id: 1, name: 'Prop4'}
        // ]

      }
    }


    function HandleErrorWithGetOrg ( response ) {
       HandleError.newErr(response, getOrg); 
    }


    // provide a hook for testing functions
    this.getOrg = getOrg;

  }]);
