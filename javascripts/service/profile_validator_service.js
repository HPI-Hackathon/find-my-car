define([ "underscore" ], function() {

	return {
		validateProfile: function(averageCarType, userProfile){
			var min_max_prices = userProfile.getMinMaxPrice();
			averageCarType.min_price = min_max_prices.min;
			averageCarType.max_price = min_max_prices.max;
			averageCarType.colors = [userProfile.color];
			averageCarType.extras = userProfile.extras;
		}
	};
});