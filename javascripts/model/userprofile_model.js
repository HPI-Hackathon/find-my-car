define(["backbone", "underscore" ], function(Backbone, _) {
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
