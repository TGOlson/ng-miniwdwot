'use strict';

app.controller('AdminCtrl', 

  ['$scope',
   'Admin',
   'Flash',
   '$rootScope',
   '$cookieStore',

  function($scope, Admin, Flash, $rootScope, $cookieStore) {


  if( $cookieStore.get('admin') ){
    $rootScope.admin = $cookieStore.get('admin');
  }

  $scope.showLoginForm = function () {
    $scope.showForm = true;
    $scope.login = {}
  }


  $scope.cancelSignIn = function () {
    $scope.showForm = false;
    $scope.login = {}
  }


  $scope.signIn = function () {


    // Check SiteControl to verify user
    Admin.get( $scope.login , function ( response ) {

      if(response.status === 'ok') {

        setResponseAsAdmin(response.user_id);

        // check with server to see if org exists
        // or if we need to save the data to the database
        verifyOrgExists(response)

        $scope.showForm = false;

      } else {
        Flash.msg.danger('signInFail');
        $scope.login = {}
      }

    });
  }


  function setResponseAsAdmin ( userId ) {

    var adminData = {
      id:    userId,
      email: $scope.login.email,
    };

    // Set admin
    $rootScope.admin = adminData;
    $cookieStore.put('admin', adminData);
    Flash.msg.info('signInSuccess');
  }


  function verifyOrgExists ( response ) {

    var options = {
      organization: {

        // send SiteControl user_id
        id: response.user_id,
        
        // send other info in event that new organization is created
        email: $scope.login.email,
        token: response.token,
        groups: response.groups
      }
    };

    Admin.verify.save( options, function ( obj ) {
      // consider doing something with obj.new_org check here
      console.log('admin verify.save', obj)
      console.log('admin verify.save.new_org', obj.new_org)
    });

  }

  $scope.signOut = function () {
    $rootScope.admin = null;
    $cookieStore.remove('admin');
    Flash.msg.info('signOutSuccess');
  }

}]);
