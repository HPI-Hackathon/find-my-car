define("app", ["application"], function(Application) {
  return new Application();
});

define(
  ["underscore",
  "jquery",
  "app",
  "router",
  "data/routes",
  "data/userprofile",
  "service/route_validator_service",
  "service/profile_validator_service",
  "service/car_ads_service",
  "service/blacklist_service",
  "collection/cartype_collection",
  "model/userprofile_model",
  "model/average_cartype_model",
  "model/basevalues_model",
  "model/ads_model"],
  function(_, $, app, Router, RoutesData, UserData, RouteValidatorService, ProfileValidatorService, CarAdsService, BlacklistService, CartypeCollection, UserProfileModel, AverageCartypeModel, BaseValuesModel, AdsModel) {

    function initializeRoutesData() {
      var rawCartypes = _.map(RoutesData.routes, function(route) {
        return app.routeValidatorService.validateRoute(route);
      });
      var cartypes = _.flatten(rawCartypes);

      // update cartype
      app.cartypeCollection.add(cartypes);
    }

    app.update = function() {
      var routesCartype = app.cartypeCollection.generateAverageCartype();
      app.profileValidatorService.validateProfile(routesCartype);

      var ratingCartype = app.ratings.generateAverageCartype();
      var averageCartype = routesCartype.merge(ratingCartype);

      // return promise
      return app.carAdsService.getResults(averageCartype).done(function(response) {
        var models = _.map(response.items, function(item) {
          return new AdsModel(item);
        });
        app.adsCollection = app.blacklistService.createAdsList(models);
      });
    };

    app.onInitialize(function() {
      // services
      app.routeValidatorService = new RouteValidatorService();
      app.profileValidatorService = new ProfileValidatorService();
      app.carAdsService = new CarAdsService();
      app.blacklistService = new BlacklistService();

      // global models & collections
      app.userProfile = new UserProfileModel(UserData);
      app.ratings = new BaseValuesModel();
      app.cartypeCollection = new CartypeCollection();
    });

    // start up
    app.initialize();

    //
    // do after startup thingies here
    //

    initializeRoutesData();

    $.when(
      app.userProfile.convertAddress(), // convert address to latlon
      app.userProfile.getPricePerSMeter()
    ).done(function() {
        app.router = new Router();
        Backbone.history.start();
      }
    );

});
