'use strict';

describe('Controller: OrganizationEditCtrl', function () {

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
    this.update = function ( options, callback ) {
      if( returnError ) { return callback( { failure: true } ); }
      return callback ( org );
    }
    this.delete = function ( options, callback ){
      if( returnError ) { return callback( { failure: true } ); }
      org.id = null;
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

    OrganizationCtrl = $controller('OrganizationEditCtrl', {
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
  

  describe('get', function () {

    it('should be defined', function () {
      expect(OrganizationCtrl.getOrg).toBeDefined();
    });

    it("should set an organization", function() {
      OrganizationCtrl.getOrg();
      expect($scope.organization).toEqual(org);
    });

  });

  describe('update', function () {

    beforeEach( function () { 
      OrganizationCtrl.getOrg(); 
      spyOn(Flash, 'message');
    });

    it("should be defined", function() {
      expect($scope.update).toBeDefined();
    });

    // this test is super trivial, 
    // but it tests that update works in standard cases
    // errors are tested next
    it("should update an organization with good params", function() {
      $scope.organization.name = 'something else'
      $scope.update();

      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization.name).toEqual('something else');
      expect(Flash.message).toHaveBeenCalledWith('info', jasmine.any(String) );
    });

    it("should not update an organization with bad params", function() {
      $scope.organization.name = 'something else'
      returnError = true;
      $scope.update();

      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization.name).toEqual('hi');
      // dont test flash message here
      // that can be tested in HandleError service
    });

  });

  describe('cancel', function () {
    it("should cancel any changes made to an organization", function() {
      spyOn(Flash, 'message');

      $scope.organization.name = 'something else'
      $scope.cancel();
      
      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization.name).toEqual('hi');
      expect(Flash.message).toHaveBeenCalledWith('danger', jasmine.any(String) );
    });

  });

  describe('delete', function () {

    it("should delete an organization with good params", function() {
      spyOn(Flash, 'message');

      $scope.delete();

      expect($location.path()).toEqual('/');
      expect($scope.organization.id).toBeNull();
      expect(Flash.message).toHaveBeenCalledWith('info', jasmine.any(String) );
    });

    it("should not delete an organization with bad params", function() {
      
      returnError = true;
      $scope.delete();

      expect($location.path()).toEqual('/' + org.id);
      expect($scope.organization).toEqual(org);
      // dont test flash message here
      // that can be tested in HandleError service
    });

  });

  describe('successfulCall', function(){

    it("should return true if object does not have a truthy failure attribute", function() {
      var object = { something: true, somethingElse: 123 };
      expect(OrganizationCtrl.successfulCall(object)).toBe(true);

      object.failure = false;
      expect(OrganizationCtrl.successfulCall(object)).toBe(true);
    });    

    it("should return false if object has a truthy failure attribute", function() {
      var object = { something: true, somethingElse: 123, failure: true };
      expect(OrganizationCtrl.successfulCall(object)).toBe(false);
    });

  });

});
