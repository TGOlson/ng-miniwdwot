'use strict';

app.controller('AdminCtrl', ['$scope', 'Admin', 'Flash', '$rootScope', function($scope, Admin, Flash, $rootScope) {


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

        // check with rails server to see if org exists
        verifyOrgExists(response)

      } else {
        Flash.message('danger', 'Bad email or password.');
      }

      $scope.showForm = false;
    });
  }


  function setResponseAsAdmin ( userId ) {

    var adminData = {
      id: userId,
      email: $scope.login.email,
    };

    // Set admin
    $rootScope.admin = adminData;

    Flash.message('info', 'Sign in successful.');
  }


  function verifyOrgExists ( response ) {

    console.log(response)

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

    });

  }

  $scope.signOut = function () {

    $rootScope.admin = null;
    Flash.message('info', 'Sign out successful.');
  }

}]);
