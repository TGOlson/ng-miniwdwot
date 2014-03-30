'use strict';

describe('Controller: OrganizationsCtrl', function () {

  // load the controller's module
  beforeEach(module('miniwdwot'));

  var OrganizationsCtrl,
    $scope,
    Organization,
    org,
    orgs;


  // stub out fake service
  Organization = function () {
    this.query = function ( callback ) {
      return callback ( [orgs] );
    }
  }



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    $scope = $rootScope.$new();

    OrganizationsCtrl = $controller('OrganizationsCtrl', {
      $scope: $scope,
      Organization: new Organization()
    });

    org = {
      id: 1,
      name: 'hi',
      email: 'hello@hi.co'
    }

    orgs = [org]
  }));


  it('should have a list of organizations', function () {
    expect($scope.organizations).toBeDefined();
    expect($scope.organizations.length).toBe(1);
  });

});
