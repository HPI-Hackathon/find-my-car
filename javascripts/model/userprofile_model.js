define(["backbone", "underscore", "jquery"], function(Backbone, _, $) {
    var UserProfile = Backbone.Model.extend({
    	//data attributes
      defaults: {
      	age: null,
      	gender: null,
      	address: null,
      	pricePerSMeter: null,
      	color: null,
      	extras: null,
      },

      convertAddress: function(){
        var self = this;
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&sensor=false";
        var json = $.getJSON(url, function(json) { return json });

        return json.done(function(response) {
          var location = response.results[0].geometry.location;
          self.point = location.lat + ", " + location.lng;
        });
      },

    	//converters
    	getMinMaxPrice: function(){
    		//setPricePerSMeter();
    		min = pricePerSMeter* 1000 * 0.7;
    		max = pricePerSMeter* 1000 * 1.3;

    		return {min: min, max: max};
    	},

    	setPricePerSMeter: function(){
    		//TODO get from location
    	}
    });

    return UserProfile;
});
