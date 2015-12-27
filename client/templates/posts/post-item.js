Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  upvotedClass: function() {
    if (Meteor.userId()) {
      if (_.include(this.upvoters, Meteor.userId()) ) return 'disabled';
      return 'btn-primary upvotable';
    }
  }
});
Template.postItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
