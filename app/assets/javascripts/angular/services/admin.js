app.service('Admin', ['$resource', '$rootScope', '$location', 'Flash', function($resource, $rootScope, $location, Flash) {

  Admin = $resource('http://whydontweownthis.com/users/sign_in.json')

  Admin.verify = $resource('/verify');


  function canEdit(orgId) {

    // if user is logged in
    if( $rootScope.admin ) {

      // if logged in user id is equal to current organization
      if( $rootScope.admin.id == orgId ) return true;
    }

    // otherwise, they can't edit
    return false;
  }

  Admin.verifyCanEdit = function (orgId) {

    if(!canEdit(orgId)) {

      $location.path('/' + orgId);
    
      Flash.msg.danger('notSignedIn')
    
    }

  }

  return Admin

}]);
