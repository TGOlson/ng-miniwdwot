'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('miniwdwot'));

  var OrganizationCtrl,
    $scope,
    $location,
    Organization,
    Flash,
    org,
    returnError;


  // stub out fake services
  Organization = function () {
    this.get = function ( id, callback ) {
      return callback ( org );
    }
  }

  Flash = {
    message: function ( klass, message ) {
      return;
    }
  }

  $location = {
    currentPath: null,

    path: function ( newPath ) {
      if( newPath ) { this.currentPath = newPath; }
      else { return this.currentPath }
    }
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    $scope = $rootScope.$new();

    OrganizationCtrl = $controller('OrganizationCtrl', {
      $scope: $scope,
      Organization: new Organization(),
      Flash: Flash,
      $location: $location,
      $routeParams: { id: 1 }
    });


    // reset org for each test
    org = {
      id: 1,
      name: 'hi',
      email: 'hello@hi.co',
      logo_url: 'something.com'
    }
    
    $location.path('/' + org.id)
    

    // flag for error testing
    returnError = false;

  }));


  it('should have a default organization with null attributes', function () {
    expect($scope.organization).toBeDefined();
    expect($scope.organization.id).toBeNull();
  });
  
  it('should default badOrg to false', function () {
    expect($scope.badOrg).toBe(false);
  });

  describe('get', function () {

    it('should be defined', function () {
      expect(OrganizationCtrl.getOrg).toBeDefined();
    });

    it("should set an organization", function() {
      OrganizationCtrl.getOrg();
      expect($scope.organization).toEqual(org);
    });

    it("should set badOrg to true for a bad response", function() {
      org.id = null;
      OrganizationCtrl.getOrg();
      expect($scope.badOrg).toBe(true);
    });

  });


});
