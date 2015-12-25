Errors = new Mongo.Collection(null); // no server name
throwError = function(message) {
  Errors.insert({message: message});
};

Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});
