define(["backbone"], function(Backbone) {
    var AvgCartype = Backbone.Model.extend({
      carclasses: [],
      min_seats: null,
      max_seats: null,
      min_price: null,
      max_price: null,
      colors: [],
      extras: {}
    });

    return AvgCartype;
});
