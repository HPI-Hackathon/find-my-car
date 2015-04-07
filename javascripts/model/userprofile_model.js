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
      convertAddress: function(){
        var self = this;
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + this.address.join(" ") + "&sensor=false";
        var json = $.getJSON(url);

        return json.done(function(response) {
          var location = response.results[0].geometry.location;
          self.point = location.lat + "," + location.lng;
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
