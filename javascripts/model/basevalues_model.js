define([
  "backbone",
  "model/average_cartype_model" ], function(Backbone, AverageCartypeModel) {
    return Backbone.Model.extend({
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
        var attr = _.clone(_.find(this.get(category), { name: name }));

        if (attr !== undefined) {
          attr.score++;
          var attrs = _.clone(this.get(category));
          console.log(attr, attrs, category, name);
          for (var i = 0; i < attrs.length; i++) {
            if (attrs[i].name == attr.name) {
              attrs[i] = attr;
              break;
            }
          }
          //sattrs[attrs.indexOf(attr)] = attr;
          this.set(category, attrs);
          console.log(this.get(category));
        }
      },

      getOverallScore: function() {
        var self = this;
        console.log(_.map(this.attributes, function(values, category) {
            return self.getFullScore(category);
          }), this);
        return _.reduce(
          _.map(this.attributes, function(values, category) {
            return self.getFullScore(category);
          }),
          function(sum, num) { return sum + num; },
          0
        );
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

        // require some data to work with
        if (fullScore <= 10) {
          return sorted;
        }

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
        var sorted = _.sortBy(this.attributes[category], "score");
        var fullScore = this.getFullScore(category);
        var score = 0;

        // require some data to work with
        if (fullScore <= 10) {
          return sorted[0];
        }

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
        var sorted = _.sortBy(this.attributes[category], "score").reverse();
        var fullScore = this.getFullScore(category);
        var score = 0;

        // require some data to work with
        if (fullScore <= 10) {
          return sorted[0];
        }

        while (score/fullScore <= 0.1) {
          var obj = sorted.shift();
          max.push(obj.value);
          score += obj.score;
        }

        return max[max.length-1];
      },

      getPriceCategory: function(amountString) {
        var amount = parseInt(amountString);
        var priceclass = _.find(this.attributes.priceclasses, function(pclass) {
          return pclass.value.from <= amount && amount <= pclass.value.to;
        });

        if (priceclass.name) {
          return priceclass.name;
        }
      },

      generateAverageCartype: function() {
        // resulting cartype
        var averageCartype = new AverageCartypeModel();

        // evaluate the most fitting
        var prices = this.getAverageOf("priceclasses");

        averageCartype.set({
          carclasses: _.pluck(this.getAverageOf("carclasses"), "value"),
          min_seats: this.getMinOf("seats").value,
          max_seats: this.getMaxOf("seats").value,
          colors: _.pluck(this.getAverageOf("colors"), "value"),
          min_price: _.sortBy(prices, function(price) { return price.value.from; })[0].value.from,
          max_price: _.sortBy(prices, function(price) { return price.value.to; }).reverse()[0].value.to,
          score: this.getOverallScore()
        });

        return averageCartype;
      }

    });
});
