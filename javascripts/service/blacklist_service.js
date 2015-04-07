/*
Function which creates a new list 
*/
define(["app", "underscore", "collection/blacklist_collection"], function(app, _, Blacklist_collection) {
  var BlacklistService = function() {
    this.blacklist = {};
  };

  _.extend(BlacklistService.prototype, {
  
    addId: function(id){
      this.blacklist[id] = id;
    },

    createAdsList: function(models){
      var adsList = [];
      _.each(models, function(model){    
        if(!_.contains(this.blacklist, model.get("id"))){
         adsList.push(model);
        }
      });
      return new Blacklist_collection(adsList);
    }

  });

    return BlacklistService;
});