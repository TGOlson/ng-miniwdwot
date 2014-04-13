app.service('Organization', ['$resource', function($resource) {

  var current,
      resource;

  current = {
    id: null,
    name: null,
    email: null,
    logo_url: null
  }

  resource = $resource('/organizations/:id', { id: '@id' }, { update: { method: "PUT" } })

  var Organization = function () {
    this.current = current;
    this.service = resource;


    this.colors = [
      'default',
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ]

  }

  // extend resource
  Organization.prototype.query = function () {
    return this.service.query()
  }

  Organization.prototype.get = function (args) {
    return this.service.get(args)
  }

  Organization.prototype.update = function (args) {
    return this.service.update(args)
  }

  Organization.prototype.delete = function (args) {
    return this.service.delete(args)
  }

  Organization.prototype.loadColorScheme = function () {
    var colorScheme = this.current.color_scheme;
    console.log(colorScheme)
    setBodyId(colorScheme);
  }

  Organization.prototype.previewColorScheme = function (colorScheme) {
    setBodyId(colorScheme);
  }

  function setBodyId(colorScheme) {
    $('body').attr('id', colorScheme);
  }

  return new Organization();

}]);
