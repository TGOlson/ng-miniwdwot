'use strict';

app.controller('AdminCtrl', ['$scope', 'Admin', 'Flash', '$rootScope', function($scope, Admin, Flash, $rootScope) {

  $scope.showForm = false;

  $scope.showLoginForm = function () {

    $scope.showForm = true;
    $scope.login = {}
  }

  $scope.cancelSignIn = function () {
    $scope.showForm = false;
  }

  $scope.signIn = function () {


    // Check SiteControl to verify user
    Admin.get( $scope.login , function ( response ) {


      if(response.status === 'ok') {


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

        // Get organization information from Rails server
        Admin.signIn.save( options, function ( obj ) {

          // Set admin as object return
          $rootScope.admin = obj;

        });


        Flash.message('info', 'Sign in successful.');


      } else {

        Flash.message('danger', 'Bad email or password.');

      }


      $scope.showForm = false;
    });
  }

  $scope.signOut = function () {

    $rootScope.admin = null;
    Flash.message('info', 'Sign out successful.');
  }

}]);
