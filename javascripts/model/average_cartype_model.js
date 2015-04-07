define(["backbone"], function(Backbone) {
    var AverageCartypeModel = Backbone.Model.extend({
      // data attributes
      defaults: {
        carclasses: [],
        min_seats: null,
        max_seats: null,
        min_price: 0,
        max_price: 0,
        colors: [],
        extras: {},
        score: 0, // if Routes: how many routes where gathered? if Rating: how many iterations?
      },

      // expectation: ohterCartype is always the rating avgCartype
      merge: function(otherCartype) {
        var weighting = (1 - Math.min(otherCartype.get("score")/100, 1) * 0.8);
        var mergedCartype = this.clone();

        mergedCartype.set({
          min_price: parseInt(mergedCartype.get("min_price") * weighting + otherCartype.get("min_price") *(1 - weighting)),
          max_price: parseInt(mergedCartype.get("max_price") * weighting + otherCartype.get("max_price") *(1 - weighting)),

          min_seats: parseInt(mergedCartype.get("min_seats") * weighting + otherCartype.get("min_seats") *(1 - weighting)),
          max_seats: parseInt(mergedCartype.get("max_seats") * weighting + otherCartype.get("max_seats") *(1 - weighting)),

          colors: _.union(mergedCartype.get("colors"), otherCartype.get("colors")),
          carclasses: _.union(mergedCartype.get("carclasses"), otherCartype.get("carclasses"))
        });

        return mergedCartype;
      }
    });

    return AverageCartypeModel;
});
