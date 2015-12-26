Template.postEdit.events({
  'submit form': function(e, template) {
    e.preventDefault();


    var postProperties = {
      url: e.target.url.value,
      title: e.target.title.value
    }
    var errors = validatePost(postProperties);
if (errors.title || errors.url)
  return Session.set('postEditErrors', errors);

    Posts.update(this._id, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
       Router.go('postPage', {_id: template.data._id});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});
Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});
