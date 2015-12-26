Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});
Meteor.publish('onePost', function(_id) {
  check(_id, String)
  return Posts.find(_id);
});
Meteor.publish('comments', function(id) {
  check(id, String);
  return Comments.find({postId:id});
});
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read:false})
});
