app.service('Property', ['$resource', function($resource) {


  // Property = $resource('http://'+groupNameSlug+'.sitecontrol.us/m/'+mapNameSlug+'/blocks/' + hood + '.json', { group_id: '@group_id' });
  // Property = $resource('http://mike-evans-world.sitecontrol.us/m/banana-hammock-land/detroit.json');

  // Property = $resource('http://mike-evans-world.sitecontrol.us/maps/:map_id/list.json?');
  

  Property = $resource('/maps/:map_id/properties');




                     // http://mike-evans-world.sitecontrol.us/m/like/detroit.json?token=3j9a51qrtfvfHiVsthXt

  return Property

}]);


      // options = {
      //   token: userToken
      // }

      // $.ajax({
      //     type: "GET",
      //     url: 'http://'+groupNameSlug+'.sitecontrol.us/m/'+mapNameSlug+'/blocks/' + hood + '.json?',
      //     crossDomain: true,
      //     timeout: 150000,
      //     data: options,
      //     dataType: "json",
      //     success: function(data){
      //         BESUCCESSFUL!
      //     });
      // });

      // groupNameSlug = The group that the selected map belongs to.
      // mapNameSlug   =  The requested map.
      // userToken         = The logged in org/user auth token.

      // This will return an array of all tagged properties in the map along with a key for each tag.
