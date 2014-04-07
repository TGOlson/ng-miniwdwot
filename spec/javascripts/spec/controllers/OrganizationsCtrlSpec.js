'use strict';

describe('Controller: OrganizationsCtrl', function () {

  // load the controller's module
  beforeEach(module('miniwdwot'));

  var OrganizationsCtrl,
      $scope,
      Organization,
      org,
      orgs;

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

  // stub out fake service
  Organization = function () {
    this.query = function () {
      return fakePromise([orgs]);
    }
  }



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    $scope = $rootScope.$new();

    OrganizationsCtrl = $controller('OrganizationsCtrl', {
      $scope: $scope,
      Organization: new Organization()
    });

    org = {};

    orgs = [org];
  }));


  it('should have a list of organizations', function () {
    expect($scope.organizations).toBeDefined();
    expect($scope.organizations.length).toBe(1);
  });

});
