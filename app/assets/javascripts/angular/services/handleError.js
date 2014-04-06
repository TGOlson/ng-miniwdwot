app.factory('HandleError', ['Flash', function (Flash) {


  function newErr(response) {
    console.log('Action failed', response);
    Flash.msg.danger('failedAction');
  }

  return {
    newErr: newErr
  }

  
}]);
