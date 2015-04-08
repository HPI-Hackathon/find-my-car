define(["backbone", "app", "underscore"], function(Backbone, app, _) {
    return Backbone.Model.extend({
    // data attributes
    defauls:{
    	validateHashes: {}
    },

    // converter
    finish: function(detailsModel) {
      var baseValueMapping = {
        "color": "colors",
        "carclass": "carclasses",
        "numSeat": "seats",
        "price": function(value) { app.ratings.addBaseValue("priceclasses", app.ratings.getPriceCategory(value)); }
      };

      _.each(baseValueMapping, function(mappingKey, key) {
        if (this.attributes.validateHashes[key]) {
          if (_.isString(this.attributes.validateHashes)) {
            app.ratings.addBaseValue(mappingKey, this.attributes.validateHashes[key]);
          } else if (_.isFunction(mappingKey)) {
            mappingKey(this.attributes.validateHashes[key]);
          }
        }
      });

    	app.blacklistService.addId(this.id);
    },

    setValue: function(key, value) {
    	this.attributes.validateHashes[key] = value;
    },

    unsetValue: function(key) {
    	delete this.attributes.validateHashes[key];
    },

    });
});
