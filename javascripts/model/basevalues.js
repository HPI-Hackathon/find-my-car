define("basevalues", ["backbone"], function(Backbone) {
    var BaseValues = Backbone.Model.extend({
      // data attributes
      carclasses: [
        { name: "Limousine", score: 0 },
        { name: "Geländewagen/Pickup", score: 0 },
        { name: "Kleinwagen", score: 0 },
        { name: "Caprio/Roadster", score: 0 },
        { name: "Kombi", score: 0 },
        { name: "Sportwagen/Coupé", score: 0 },
        { name: "Van/Kleinbus", score: 0 },
        { name: "Andere", score: 0 },
      ],
      colors: [
        { color: "beige", score: 0 },
        { color: "gold",  score: 0 },
        { color: "violett", score: 0 },
        { color: "yellow", score: 0 },
        { color: "black", score: 0 },
        { color: "green", score: 0 },
        { color: "red", score: 0 },
        { color: "blue", score: 0 },
        { color: "gray", score: 0 },
        { color: "silver", score: 0 }
      ],
      seats: [
        { amount: 2, score: 0 },
        { amount: 4, score: 0 },
        { amount: 5, score: 0 },
        { amount: 7, score: 0 },
        { amount: 8, score: 0 },
        { amount: 9, score: 0 }
      ],
      priceclasses: [
        { from: 0, to: 2000, score: 0 },
        { form: 2001, to: 4000, score: 0 },
        { form: 4001, to: 8000, score: 0 },
        { form: 8001, to: 12000, score: 0 },
        { form: 12001, to: 20000, score: 0 },
        { form: 20001, to: 30000, score: 0 },
        { form: 30001, to: 50000, score: 0 },
        { form: 50001, to: 90000, score: 0 }
      ]

      // converters

    });

  return BaseValues;
});
