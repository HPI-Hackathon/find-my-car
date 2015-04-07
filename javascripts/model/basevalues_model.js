define(["backbone", "underscore" ], function(Backbone, _) {
    var BaseValues = Backbone.Model.extend({
      // data attributes
      defaults: {
        carclasses: [
          { name: "EstateCar", value: "EstateCar", score: 0 },
          { name: "Cabrio", value: "Cabrio", score: 0 },
          { name: "OffRoad", value: "OffRoad", score: 0 },
          { name: "Limousine", value: "Limousine", score: 0 },
          { name: "SmallCar", value: "SmallCar", score: 0 },
          { name: "SportsCar", value: "SportsCar", score: 0 },
          { name: "Van", value: "Van", score: 0 },
          { name: "OtherCar", value: "OtherCar", score: 0 },
        ],
        colors: [
          { name: "beige", value: "beige", score: 0 },
          { name: "gold", value: "gold", score: 0 },
          { name: "violett", value: "violett", score: 0 },
          { name: "yellow", value: "yellow", score: 0 },
          { name: "black", value: "black", score: 0 },
          { name: "green", value: "green", score: 0 },
          { name: "red", value: "red", score: 0 },
          { name: "blue", value: "blue", score: 0 },
          { name: "gray", value: "gray", score: 0 },
          { name: "silver", value: "silver", score: 0 }
        ],
        seats: [
          { name: "2", value: 2, score: 0 },
          { name: "4", value: 4, score: 0 },
          { name: "5", value: 5, score: 0 },
          { name: "7", value: 7, score: 0 },
          { name: "8", value: 8, score: 0 },
          { name: "9", value: 9, score: 0 }
        ],
        priceclasses: [
          { name: "0", value: { from: 0, to: 2000 }, score: 0 },
          { name: "2001", value: { from: 2001, to: 4000 }, score: 0 },
          { name: "4001", value: { from: 4001, to: 8000 }, score: 0 },
          { name: "8001", value: { from: 8001, to: 12000 }, score: 0 },
          { name: "12001", value: { from: 12001, to: 20000 }, score: 0 },
          { name: "20001", value: { from: 20001, to: 30000 }, score: 0 },
          { name: "30001", value: { from: 30001, to: 50000 }, score: 0 },
          { name: "50001", value: { from: 50001, to: 90000 }, score: 0 }
        ]
      },

      // converters
      addBaseValue: function(category, name) {
        _.find(this.attributes[category], name).score += 1;
      },

      resetBaseValue: function(category, name) {
        _.find(this.attributes[category], name).score = 0;
      },

      getOverallScore: function() {
        return _(this.attributes).pluck("score")
          .reduce(values, function(memo, num){return memo + num;}, 0);
      },

      getFullScore: function(category) {
        return _(this.attributes[category]).pluck("score")
          .reduce(function(memo, num) { return memo + num; }, 0);
      },

      getAverageOf: function(category) {
        if (category === "seats") {
          throw new Error("average of seats is useless");
        }

        var average = [];
        var sorted = _.sortBy(this.attributes[category], "score");
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.5) {
          var obj = sorted.shift();
          average.push(obj.value);
          score += obj.score;
        }

        return average;
      },

      getMinOf: function(category) {
        if (category !== "seats") {
          throw new Error("only minimum of seats is allowed");
        }

        var min = [];
        var sorted = _.sortBy(this.attributes[category], "score").reverse();
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.1) {
          var obj = sorted.shift();
          min.push(obj.value);
          score += obj.score;
        }

        return min[min.length-1];
      },

      getMaxOf: function(category) {
        if (category !== "seats") {
          throw new Error("only minimum of seats is allowed");
        }

        var max = [];
        var sorted = _.sortBy(this.attributes[category], "score");
        var fullScore = this.getFullScore(category);
        var score = 0;

        while (score/fullScore <= 0.1) {
          var obj = sorted.shift();
          max.push(obj.value);
          score += obj.score;
        }

        return max[max.length-1];
      },

      generateAverageCartype: function() {

      }


    });

  return BaseValues;
});
