define(["backbone", "underscore" ], function(Backbone, _) {
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
        { name: "beige", score: 0 },
        { name: "gold",  score: 0 },
        { name: "violett", score: 0 },
        { name: "yellow", score: 0 },
        { name: "black", score: 0 },
        { name: "green", score: 0 },
        { name: "red", score: 0 },
        { name: "blue", score: 0 },
        { name: "gray", score: 0 },
        { name: "silver", score: 0 }
      ],
      seats: [
        { name: "2", score: 0 },
        { name: "4", score: 0 },
        { name: "5", score: 0 },
        { name: "7", score: 0 },
        { name: "8", score: 0 },
        { name: "9", score: 0 }
      ],
      priceclasses: [
        { name: "0", from: 0, to: 2000, score: 0 },
        { name: "2001", form: 2001, to: 4000, score: 0 },
        { name: "4001", form: 4001, to: 8000, score: 0 },
        { name: "8001", form: 8001, to: 12000, score: 0 },
        { name: "12001", form: 12001, to: 20000, score: 0 },
        { name: "20001", form: 20001, to: 30000, score: 0 },
        { name: "30001", form: 30001, to: 50000, score: 0 },
        { name: "50001", form: 50001, to: 90000, score: 0 }
      ],

      // converters
      addBaseValue: function(category, name) {
        _.find(this[category], name).score += 1;
      },

      resetBaseValue: function(category, name) {
        _.find(this[category], name).score = 0;
      },

      getOverallScore: function() {
        return _(this.attributes).pluck("score")
          .reduce(values, function(memo, num){return memo + num;}, 0)
          .value();
      },

      getFullScore: function(category) {
        return _(this[category]).pluck("score")
          .reduce(function(memo, num) { return memo + num; }, 0)
          .value();
      },

      getAverageOf: function(category) {
        if (category === "seats") {
          throw new Error("average of seats is useless");
        }

        var average = [];
        var sorted = _.sort(this[category], "score");
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.5) {
          var obj = sorted.shift();
          average.push(obj);
          score += obj.score;
        }

        return average;
      },

      getMinOf: function(category) {
        if (category !== "seats") {
          throw new Error("only minimum of seats is allowed");
        }

        var min = [];
        var sorted = _.sort(this[category], "score").reverse();
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.1) {
          var obj = sorted.shift();
          min.push(obj);
          score += obj.score;
        }

        return min[min.length-1];
      },

      getMaxOf: function(category) {
        if (category !== "seats") {
          throw new Error("only minimum of seats is allowed");
        }

        var max = [];
        var sorted = _.sort(this[category], "score");
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.1) {
          var obj = sorted.shift();
          max.push(obj);
          score += obj.score;
        }

        return max[max.length-1];
      },

      generateAverageCartype: function() {

      }


    });

  return BaseValues;
});
