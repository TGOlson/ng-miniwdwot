app.factory('Flash', ['$rootScope', function ( $rootScope ) {
  
  // ideal format
  // Flash.msg.alert('sign-in-success');

  var msg = {
    success: function(message) { msgMaker('success', message) },
    info:    function(message) { msgMaker('info', message) },
    warning: function(message) { msgMaker('warning', message) },
    danger:  function(message) { msgMaker('danger', message) }
  }

  function msgMaker(type, message) {

    // var messageText = messageList[message]
    
    $rootScope.alert = {
      type: type,
      message: message
    }

    $('.alert').show().addClass('animated fadeInUp').delay(1000).fadeOut(1000);

  }

  return {
    msg: msg
  }
    

}]);



// ( function initMsg() {

//   for(var i in msg) {

//     var textName = msg[i];

//     msg[i] = function(message) {
//       var text = textName;

//       msgMaker(text, message)
    
//     };
  
//   }
// })();




