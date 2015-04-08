define(["backbone", "app", "underscore"], function(Backbone, app, _) {
    return Backbone.Model.extend({
    initialize: function() {
      this.validateHashes = {};
    },

    // converter
    finish: function(detailsModel) {
      var baseValueMapping = {
        "color": "colors",
        "carclass": "carclasses",
        "numSeat": "seats",
        "price": function(value) { app.ratings.addBaseValue("priceclasses", app.ratings.getPriceCategory(value)); }
      };
      var self = this;

      _.each(baseValueMapping, function(mappingKey, key) {
        if (self.validateHashes[key]) {
          if (_.isString(self.validateHashes)) {
            app.ratings.addBaseValue(mappingKey, self.validateHashes[key]);
          } else if (_.isFunction(mappingKey)) {
            mappingKey(self.validateHashes[key]);
          }
        }
      });

    	app.blacklistService.addId(this.id);
    },

    setValue: function(key, value) {
    	this.validateHashes[key] = value;
    },

    unsetValue: function(key) {
    	delete this.validateHashes[key];
    },

    });
});
