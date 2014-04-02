app.factory('Flash', ['$rootScope', function ( $rootScope ) {

  return {

    message: function ( type, message ) {

      $rootScope.alert = {
        type: type,
        message: message
      }

      $('.alert').show().addClass('animated fadeInUp').delay(1000).fadeOut(1000);

    }
  }
}]);
