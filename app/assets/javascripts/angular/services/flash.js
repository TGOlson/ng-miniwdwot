app.factory('Flash', ['$rootScope', function ( $rootScope ) {

  return {

    message: function ( type, message ) {

      $rootScope.alert = {
        type: type,
        message: message
      }

      $('.alert').show().delay(2000).fadeOut(1000);

    }
  }
}]);
