'use strict';

describe('Controller: OrganizationEditCtrl', function () {

  // load the controller's module
  beforeEach(module('miniwdwot'));

  var OrganizationEditCtrl,
    $scope,
    $location,
    Organization,
    Flash,
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


  // stub out fake services
  Organization = function () {
    this.current = { id: null };

    this.get    = function () { return fakePromise(org); }
    this.update = function () { return fakePromise(org); }
    this.delete = function () { return fakePromise(org); }
  }

  Flash = {
    msg: { info: {}, danger: {} }
  }

  $location = {
    currentPath: null,

    path: function (newPath) {
      if(newPath) { this.currentPath = newPath; }
      else { return this.currentPath }
    }
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    $scope = $rootScope.$new();

    OrganizationEditCtrl = $controller('OrganizationEditCtrl', {
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
    };
    
    $location.path('/' + org.id);

  }));


  it('should have a default organization with null attributes', function () {
    expect($scope.organization).toBeDefined();
    expect($scope.organization.id).toBeNull();
  });
  

  describe('get', function () {

    it('should be defined', function () {
      expect(OrganizationEditCtrl.getOrg).toBeDefined();
    });

    it("should set an organization", function() {
      OrganizationEditCtrl.getOrg();
      expect($scope.organization).toEqual(org);
    });

  });

  describe('update', function () {

    beforeEach( function () { 
      OrganizationEditCtrl.getOrg(); 
      spyOn(Flash.msg, 'info');
    });

    it("should be defined", function() {
      expect($scope.update).toBeDefined();
    });

    // this test is super trivial, 
    // but it tests that update works in standard cases
    // errors are tested via service tests
    it("should update an organization with good params", function() {
      $scope.organization.name = 'something else'
      $scope.update();

      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization.name).toEqual('something else');
      expect(Flash.msg.info).toHaveBeenCalledWith(jasmine.any(String));
    });

  });

  describe('cancel', function () {
    it("should cancel any changes made to an organization", function() {
      spyOn(Flash.msg, 'danger');

      $scope.organization.name = 'something else'
      $scope.cancel();
      
      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization.name).toEqual('hi');
      expect(Flash.msg.danger).toHaveBeenCalledWith(jasmine.any(String));
    });

  });

  describe('delete', function () {

    // this tests produces a confirm dialog
    // comment out for standard test runs

    // it("should delete an organization with good params", function() {
    //   spyOn(Flash.msg, 'info');

    //   $scope.delete();

    //   expect($location.path()).toEqual('/');
    //   expect(Flash.msg.info).toHaveBeenCalledWith(jasmine.any(String));
    // });

  });

  describe('parseOrgParams', function(){

    it("should set orgSet to be true", function() {
      $scope.orgSet = false;
      expect($scope.orgSet).toBe(false);

      OrganizationEditCtrl.parseOrgParams({});
      expect($scope.orgSet).toBe(true);
    });    

  });

  describe('editPageError', function(){

    it("should refresh the org", function() {
      $scope.organization.name = 'I am changed';
      OrganizationEditCtrl.editPageError();
      expect($scope.organization.name).toEqual(org.name);
    });    

  });


});
