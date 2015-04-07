define(["app"], function(app) {
  var ProfileValidatorService = function() {

  };

	_.extend(ProfileValidatorService.prototype, {
		validateProfile: function(averageCartype) {
      averageCartype.set({
        min_price: app.userProfile.getMinPrice(),
        max_price: app.userProfile.getMaxPrice(),
        colors: [app.userProfile.get("color")],
        extras: app.userProfile.get("extras")
      });
		}
  });

  return ProfileValidatorService;
});
