Posts = new Mongo.Collection('posts');
Meteor.methods({
  addPost: function(url, title)
  {
    check(Meteor.userId(), String);
    check(url, String);
    check(title, String);
    //check duplicate posts
    var similarPost = Posts.findOne({url:url});
    if (similarPost) { return similarPost._id; }
    // #still need to check id
    return Posts.insert({userId: Meteor.userId(), author:Meteor.user().username, title:title, url: url, submitted: new Date()});
  }

});
