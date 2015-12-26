Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('notifications')]; }
});


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function () { return [Meteor.subscribe('comments', this.params._id), Meteor.subscribe('onePost', this.params._id)]},
  data: function() {return Posts.findOne(this.params._id)}
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { return Meteor.subscribe('onePost', this.params._id)},
  data: function() { return Posts.findOne(this.params._id); }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    return {posts: Posts.find({}, this.findOptions())};
  }
});

Router.route('/:postsLimit?', {
  name: 'postsList'
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction('dataNotFound', {only: 'postEdit'});
Router.onBeforeAction(function(){
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
       this.render(this.loadingTemplate);
     } else {
       this.render('accessDenied');
     }
  }
  else {
    this.next() ;
  }

}, {only: 'postSubmit'})
