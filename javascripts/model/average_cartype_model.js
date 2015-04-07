define(["backbone"], function(Backbone) {
    var AvgCartype = Backbone.Model.extend({
      // data attributes
      defaults: {
        carclasses: [],
        min_seats: null,
        max_seats: null,
        min_price: null,
        max_price: null,
        colors: [],
        extras: {},
        score: 0, // if Routes: how many routes where gathered? if Rating: how many iterations?
      }

      merge: function(otherCartype) {

      }
    });

    return AvgCartype;
});
