Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});
Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});



Template.postSubmit.events({

  'submit form': function(e){
    e.preventDefault();
    var errors = validatePost({url: e.target.url.value, title: e.target.title.value});
if (errors.title || errors.url)
  return Session.set('postSubmitErrors', errors);
    Meteor.call('addPost', e.target.url.value, e.target.title.value, function(error, result) {
      if (error)
        return throwError(error.reason);
      Router.go('postPage', {_id: result});
    });
  }

  });
