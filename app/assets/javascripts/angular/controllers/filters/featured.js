app.filter('featured', function() {

  return function(input, featured) {

    if(featured) {
      list = [];

      for(var i in input) {
        if(input[i].featured) list.push(input[i]);
      }

      return list;
    } else {
      return input;
    }
  };

});