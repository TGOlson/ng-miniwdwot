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

    var credentials = {
      organization: {
        email: $scope.login.email,
        password: $scope.login.password
      }
    }

    Admin.signIn.save( credentials , function ( obj ) {

      if(obj.success) {

        $scope.showForm = false;
        Flash.message('info', 'Sign in successful.')
        $rootScope.admin = obj.organization

      } else {

        $scope.showForm = false;
        Flash.message('danger', 'Invalid email or password.')

      }
    });
  }

  $scope.signOut = function () {

    $rootScope.admin = null;
    Flash.message('info', 'Sign out successful.')
  }

}]);
