Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('comments', function(id) {
  check(id, String);
  return Comments.find({postId:id});
});
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read:false});
});
