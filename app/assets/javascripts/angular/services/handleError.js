app.factory('HandleError', ['Flash', function ( Flash ) {

  return {

    newErr: function ( response, callback ) {

      console.log('Action failed', response);

      var message = 'Something went wrong' + 
                    'and that action could not be completed.';
      
      Flash.message('danger', message);

      callback();

    }

  }

  
}]);
