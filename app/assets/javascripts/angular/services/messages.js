app.factory('Messages', [ function () {
  
  return {
  
    failedAction:      'Something went wrong and that action could not be completed.',
    signInSuccess:     'Sign in successful.',
    signInFail:        'Bad email or password.',
    signOutSuccess:    'Sign out successful.',
    updateSuccess:     'Organization successfully updated.',
    updateAbort:       'Updates aborted.',
    deleteSuccess:     'Organization deleted.',
    notSignedIn:       'You mussed be signed in as this organization to access that page.',
    propertyUpdateSuccess: 'Property successfully updated.',
    emailSuccess:           'Inquiry successfully sent.'
  };

}]);
