'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('miniwdwot'));

  var OrganizationCtrl,
    $scope,
    Organization,
    org;

  // make a fake promise
  // call it a white lie
  function fakePromise(retVal) {
    return {
      $promise: {
        then: function(callback) { 
          callback(retVal); return this; 
        },
        catch: function(){}
      }
    }    
  }

  org = {};

  // stub out fake services
  Organization = function () {
    this.current = { id: null };
    this.get = function () { return fakePromise(org); }
  }


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    $scope = $rootScope.$new();

    OrganizationCtrl = $controller('OrganizationCtrl', {
      $scope: $scope,
      Organization: new Organization(),
      $routeParams: { id: 1 }
    });


    // reset org for each test
    org = {
      id: 1,
      name: 'hi',
      email: 'hello@hi.co',
      logo_url: 'something.com'
    }
    
  }));


  it('should have a default organization with null attributes', function () {
    expect($scope.organization).toBeDefined();
    expect($scope.organization.id).toBeNull();
  });
  
  describe('noMapSet', function(){

    it('should be true if no map id is set', function () {
      expect($scope.noMapSet).toBe(true);
    });


    it('should be true if no map id is set', function () {
      org.display_map_id = 1;
      OrganizationCtrl.parseOrganization(org);
      expect($scope.noMapSet).toBe(false);
    });    

  });


  describe('get', function () {

    it('should be defined', function () {
      expect(OrganizationCtrl.getOrg).toBeDefined();
    });

    it("should set an organization", function() {
      OrganizationCtrl.getOrg();
      expect($scope.organization).toEqual(org);
    });

  });

  describe('handErrorAsBadOrg', function(){

    it("should set badOrg to true", function() {
      expect($scope.badOrg).toBe(undefined);  
      OrganizationCtrl.handleErrorAsBadOrg();
      expect($scope.badOrg).toBe(true);    
    });
  
  });

});
