define(["backbone", "model/cartype_model", "model/basevalues_model"], function(Backbone, CartypeModel, BaseValues) {
    return Backbone.Collection.extend({
        // only contains only models computed from routes
        // so only carclasses and seats can be answered
        model: CartypeModel,

        generateAverageCartype: function() {
          // resulting cartype
          var averageCartype = new CartypeModel();
          var baseValues = new BaseValues();

          _(this.models).each(function(cartype) {
            baseValues.addBaseValue("carclasses", cartype.carclass);
            baseValues.addBaseValue("seats", cartype.seats);
          });

          // evaluate the most fitting cartypes and seats
          averageCartype.carclasses = baseValues.getAverageOf("carclasses");
          averageCartype.min_seats = baseValues.getMinOf("seats");
          averageCartype.max_seats = baseValues.getMaxOf("seats");

          // set count of tracked cartypes
          averageCartype.score = this.models.length;
        }
    });
});
