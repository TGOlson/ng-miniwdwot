app.service('Organization', ['$resource', 'HandleError', function($resource, HandleError) {

  var current,
      resource,
      colors;

  current = {
    id: null,
    name: null,
    email: null,
    logo_url: null
  };

  colors = [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  resource = $resource('/organizations/:id', { id: '@id' }, { update: { method: "PUT" } });

  var Organization = function () {
    this.current = current;
    this.service = resource;
    this.colors = colors;
  }

  Organization.prototype.query = function () {
    return this.service.query();
  }

  Organization.prototype.get = function (args) {
    return this.service.get(args);
  }

  Organization.prototype.update = function (args) {
    return this.service.update(args);
  }

  Organization.prototype.delete = function (args) {
    return this.service.delete(args);
  }

  Organization.prototype.loadColorScheme = function () {
    var colorScheme = this.current.color_scheme;
    setBodyId(colorScheme);
  }

  Organization.prototype.previewColorScheme = function (colorScheme) {
    setBodyId(colorScheme);
  }

  Organization.prototype.setCurrent = function (id) {
    return this.get({id: id}).$promise
      .then(parseOrganization.bind(this))
      .then(this.loadColorScheme.bind(this))
      .catch(HandleError.newErr);
  }

  function parseOrganization(obj) {
    for(var i in obj) {
      if(obj.hasOwnProperty(i)) {
        this.current[i] = obj[i];
      }
    }
  }

  function setBodyId(colorScheme) {
    $('body').attr('id', colorScheme);
  }

  return new Organization();

}]);
