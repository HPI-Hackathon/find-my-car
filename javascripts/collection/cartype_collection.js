define([
  "backbone",
  "model/cartype_model",
  "model/average_cartype_model",
  "model/basevalues_model"], function(Backbone, CartypeModel, AverageCartypeModel, BaseValues) {
    return Backbone.Collection.extend({
        // only contains only models computed from routes
        // so only carclasses and seats can be answered
        model: CartypeModel,

        generateAverageCartype: function() {
          // resulting cartype
          var averageCartype = new AverageCartypeModel();
          var baseValues = new BaseValues();

          _(this.models).each(function(cartype) {
            baseValues.addBaseValue("carclasses", cartype.get("carclass"));
            baseValues.addBaseValue("seats", cartype.get("seats") );
          });

          // evaluate the most fitting cartypes and seats
          averageCartype.set("carclasses", baseValues.getAverageOf("carclasses"));
          averageCartype.set("min_seats", baseValues.getMinOf("seats"));
          averageCartype.set("max_seats", baseValues.getMaxOf("seats"));

          return averageCartype;
        }
    });
});
