define(["backbone", "underscore", "jquery"], function(Backbone, _, $) {
    return Backbone.Model.extend({
    	// data attributes
      defaults: {
      	age: null,
      	gender: null,
      	address: null,
      	pricePerSMeter: null,
      	color: null,
      	extras: null,
        point: null,
      },

    	// converters
      convertAddress: function() {
        var self = this;
        var address = _.reduce(this.get("address"), function(sum, value) { return sum + " " + value; }, "");
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
        var json = $.getJSON(url);

        return json.then(function(response) {
          var location = response.results[0].geometry.location;
          self.set("point", location.lat + "," + location.lng);

          return response;
        });
      },

      getPricePerSMeter: function(point){
        var self = this;
        var url = "http://api.nestoria.de/api?place_name=berlin&encoding=json&action=metadata&country=de&centre_point=" + point;
        var json = $.getJSON(url + "&callback=?", null, function(json) { return json });

        return json.done(function(respJSON) {
          var price = respJSON.response.metadata[0].data["2014_m12"].avg_price;
          self.price = price / 60;
        });
      },

    	getMinPrice: function() {
    		return this.get("pricePerSMeter") * 1000 * 0.7;
      },

      getMaxPrice: function() {
    		return this.get("pricePerSMeter") * 1000 * 1.3;
    	}
    });
});
