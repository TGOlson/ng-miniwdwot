app.factory('Flash', ['$rootScope', 'Messages', function ($rootScope, Messages) {
  


  // after init msg object will be full of functions
  // a key-value pair might look like:
  // success: function (action) { msgMaker('success', action) }
  // to be used: Flash.msg.success('greatJobAction')
  var msg = {};


  // init msg object
  ( function () {

    var items = ['success', 'info', 'warning', 'danger']

    for(var i in items) {

      var string = items[i]

      msg[string] = ( function (string) {
        return function (action) { msgMaker(string, action) }
      })(string); 
    }

  })();


  function msgMaker(type, action) {

    var message = Messages[action];
    
    $rootScope.alert = {
      type: type,
      message: message
    };

    $('.alert').show().addClass('animated fadeInUp').delay(2000).fadeOut(2000);
  }


  return {
    msg: msg
  };
    

}]);
