/*
Function which creates a new list
*/
define(["app", "underscore", "collection/blacklist_collection"], function(app, _, BlacklistCollection) {
  var BlacklistService = function() {
    this.blacklist = {};
  };

  _.extend(BlacklistService.prototype, {

    addId: function(id){
      this.blacklist[id] = id;
    },

    createAdsList: function(models){
      var adsList = [];
      var self = this;

      _.each(models, function(model) {
        if (!_.contains(self.blacklist, model.get("id"))) {
          adsList.push(model);
        }
      });

      return new BlacklistCollection(adsList);
    }

  });

    return BlacklistService;
});
