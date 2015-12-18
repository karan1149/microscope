Template.postSubmit.events({

  'submit form': function(e){
    e.preventDefault();
    Meteor.call('addPost', e.target.url.value, e.target.title.value, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('postPage', {_id: result});
    });
  }

  });
