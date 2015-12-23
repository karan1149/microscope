Errors = new Mongo.Collection(null); // no server name
throwError = function(message) {
  Errors.insert({message: message});
};
