app.service('Property', ['$resource', function($resource) {


  // Property = $resource('http://'+groupNameSlug+'.sitecontrol.us/m/'+mapNameSlug+'/blocks/' + hood + '.json', { group_id: '@group_id' });
  // Property = $resource('http://mike-evans-world.sitecontrol.us/m/banana-hammock-land/detroit.json');

  // Property = $resource('http://mike-evans-world.sitecontrol.us/maps/:map_id/list.json?');
  

  Property = $resource('/maps/:map_id/properties');

  Property.wdwot = $resource('http://whydontweownthis.com/sc/mi/wayne/detroit/:id.json');



                     // http://mike-evans-world.sitecontrol.us/m/like/detroit.json?token=3j9a51qrtfvfHiVsthXt

  return Property

}]);
