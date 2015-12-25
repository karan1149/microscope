Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('comments', function(id) {
  check(id, String);
  return Comments.find({postId:id});
});
