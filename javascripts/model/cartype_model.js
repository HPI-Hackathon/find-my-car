define(["backbone"], function(Backbone) {
  var Cartype = Backbone.Model.extend({
    // data attributes
    carclass: null,
    seats: null,
    color: null,
    price: null
  });

  return Cartype;
});
