app.factory('HandleError', ['Flash', function ( Flash ) {

  return {

    newErr: function (response) {

      console.log('Action failed', response);

      var message = 'Something went wrong' + 
                    'and that action could not be completed.';
      
      Flash.msg.danger(message);

    }

  }

  
}]);
