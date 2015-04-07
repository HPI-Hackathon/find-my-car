define("app", ["application"], function(Application) {
  return new Application();
});

define(
  ["underscore",
  "app",
  "data/routes",
  "data/userprofile",
  "service/route_validator_service",
  "collection/cartype_collection",
  "model/userprofile_model"],
  function(_, app, RoutesData, UserData, RouteValidatorService, CartypeCollection, UserProfileModel) {

    app.onInitialize(function() {
      // global models
      app.userProfile = new UserProfileModel(UserData);

      // services
      app.routeValidatorService = new RouteValidatorService();
    });

    // start up
    app.initialize();

    //
    // do after startup thingies here
    //

    // routesCartype test
    var rawCartypes = _.map(RoutesData.routes, function(route) {
        return app.routeValidatorService.validateRoute(route);
      });
    var cartypes = _.flatten(rawCartypes);
    var cartypeCollection = new CartypeCollection(cartypes);
    var routesCartype = cartypeCollection.generateAverageCartype();

});
