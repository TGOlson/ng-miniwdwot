'use strict';

app.controller('PropertyCtrl', ['$scope', '$routeParams', 'Property', 'Organization', function($scope, $routeParams, Property, Organization) {


  $scope.organization = Organization.current;
  
  
  var id = $routeParams.property_id;

  Property.wdwot.get({id: id}, function(obj) {
    
    $scope.property = parseResponse(obj);

  }, function (response){

    console.log(response)

  });



  function parseResponse ( data ) {

    var fields = [];

    for(var i in data.fields){

      var keyValuePair = {
        key: data.key[i],
        value: data.fields[i]
      };

      fields.push(keyValuePair);

    }

    var streetviewUrl = parseStreetviewUrl(data);

    return {
      blexts: data.blexts,
      headline: data.headline,
      id: data.id,
      streetviewUrl: streetviewUrl,
      fields: fields
    };
  }


  function parseStreetviewUrl ( data ){

    // hard coded city, need to send this back from local server
    // var location = data.fields.address + ", " + 'Detroit'

    var options = {
      size: '700x400',
      location: "40.720032,-73.988354",
      fov: 90,
      pitch: 10,
      sensor: false,
      key: 'AIzaSyDJruY1kNOZhiw4dJFpVa-1UgyZ1pcS_MI'
    }

    var url = "http://maps.googleapis.com/maps/api/streetview?"

    var qString = toQueryString(options)

    return url + qString;

  }


  function toQueryString ( obj ) {
    var qs = []

    for(var i in obj){
      var str = i + '=' + obj[i];
      qs.push(str);
    }

    return qs.join('&')
  }

}]);


      // def streetview_url
      //    #c = self.aap_centroid ? self.send(self.aap_centroid) : nil
      //    #return '' if c.nil?
      //    opts = {
      //      :size     => '700x400',
      //      :location => "#{self.address}, #{self.city}",
      //      #:heading => heading,
      //      :fov      => 90,
      //      :pitch    => 10, 
      //      :sensor   => false,
      //      :key      => 'AIzaSyDJruY1kNOZhiw4dJFpVa-1UgyZ1pcS_MI'
      //    }
      //   return "http://maps.googleapis.com/maps/api/streetview?#{opts.to_query}"
      //  end

// blexts: Array[1]
// fields: Object
//   address: "3800 WOODWARD AVENUE"
//   curassessm: 3124995
//   frontage: "419.839996"
//   lastsaleda: null
//   lastsalepr: 0
//   ownername1: "WOODWARD OFFICES LLC"
//   parcelnumb: "01004190-201"
//   resistylel: null
//   squarefeet: "220501.000"
//   subdivisio: "MEDICAL CENTER URBAN RENE"
//   totalacres: "5.062"
//   ward: "01"
//   yearbuilt: 1965

// headline: "3800 Woodward Avenue"
// id: 182816

// key: Object
//   address: "Address"
//   cluster: "Cluster"
//   curassessm: "Assessment"
//   frontage: "Frontage"
//   lastsaleda: "Last Sale Date"
//   lastsalepr: "Last Sale Price"
//   ownername1: "Owner Name"
//   parcelnumb: "Parcel ID"
//   resistylel: "Style"
//   squarefeet: "SqFeet"
//   subdivisio: "Subdivision"
//   totalacres: "Acreage"
//   ward: "Ward"
//   yearbuilt: "Year Built"

// streetview: "http://maps.googleapis.com/maps/api/streetview?fov=90&key=ABQIAAAAL6lqe8kSDwiF8BU1Efz4bhTn5OkWXpzcZnbXAfii2qYlpAx7LhSj4jSnrqqb5bNRWhvw1a44hqSisg&location=42.349755056634336%2C-83.05801803580557&pitch=10&sensor=false&size=620x380"
