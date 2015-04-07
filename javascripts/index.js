define("app", ["application"], function(Application) {
  return new Application();
});

define(
  ["underscore",
  "app",
  "data/routes",
  "data/userprofile",
  "service/route_validator_service",
  "service/profile_validator_service",
  "service/car_ads_service",
  "collection/cartype_collection",
  "model/userprofile_model",
  "model/average_cartype_model",
  "model/basevalues_model"],
  function(_, app, RoutesData, UserData, RouteValidatorService, ProfileValidatorService, CarAdsService, CartypeCollection, UserProfileModel, AverageCartypeModel, BaseValuesModel) {

    function initializeRoutesData() {
      var rawCartypes = _.map(RoutesData.routes, function(route) {
        return app.routeValidatorService.validateRoute(route);
      });
      var cartypes = _.flatten(rawCartypes);

      // update cartype
      app.cartypeCollection.add(cartypes);
    }

     function update() {
      var routesCartype = app.cartypeCollection.generateAverageCartype();
      var ratingCartype = app.ratings.generateAverageCartype();
      var averageCartype = routesCartype.merge(ratingCartype);
      app.carResults = app.carAdsService.getResults(averageCartype);
      app.carResults.done(function() { console.log(arguments); });
    }

    app.onInitialize(function() {
      // services
      app.routeValidatorService = new RouteValidatorService();
      app.profileValidatorService = new ProfileValidatorService();
      app.carAdsService = new CarAdsService();

      // global models & collections
      app.userProfile = new UserProfileModel(UserData);
      app.ratings = new BaseValuesModel();
      app.cartypeCollection = new CartypeCollection();
    });

    // event
    app.on("update", update);

    // start up
    app.initialize();

    //
    // do after startup thingies here
    //

    initializeRoutesData();

    // fetch results from mobile.de
    update();


});
