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

      //expectation: ohterCartype is always the rating avgCartype
      merge: function(otherCartype) {
        var weighting = (1 - Math.min(otherCartype.get("score")/100.0, 1.0));
        weighting = 0.5;
        this.set("min_price", this.get("min_price") * weighting + otherCartype.get("min_price") *(1 - weighting));
        this.set("max_price", this.get("max_price") * weighting + otherCartype.get("max_price") *(1 - weighting));
      
      }
    });

    return AvgCartype;
});
