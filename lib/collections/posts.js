Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId,post)},
  remove: function(userId, post) { return ownsDocument(userId, post)}
});
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  },
  update: function(userId, post, fieldNames, modifier) {
  var errors = validatePost(modifier.$set);
  return errors.title || errors.url;
}
});
Meteor.methods({
  addPost: function(url, title)
  {
    check(Meteor.userId(), String);
    check(url, String);
    check(title, String);
    var errors = validatePost({url:url, title:title});
if (errors.title || errors.url)
  throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    //check duplicate posts
    var similarPost = Posts.findOne({url:url});
    if (similarPost) { return similarPost._id; }
    // #still need to check id
    return Posts.insert({userId: Meteor.userId(), author:Meteor.user().username, title:title, url: url, commentsCount:0, upvoters: [], votes: 0, submitted: new Date()});
  },
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }

});
validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.url)
    errors.url =  "Please fill in a URL";
  return errors;
}
