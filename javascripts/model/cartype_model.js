define(["backbone"], function(Backbone) {
  var Cartype = Backbone.Model.extend({
    // data attributes
    defaults: {
      carclass: null,
      seats: null,
      color: null,
      price: null
    }
  });

  return Cartype;
});
